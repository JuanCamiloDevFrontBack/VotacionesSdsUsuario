import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthLoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  sessionId?: string;
}

interface AuthRefreshResponse {
  accessToken: string;
  tokenType: 'Bearer';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly accessTokenKey = 'sds_access_token';

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthLoginResponse> {
    return this.http
      .post<AuthLoginResponse>(`${environment.apiRestAuth}login`, credentials, {
        withCredentials: true,
      })
      .pipe(tap((response) => this.setAccessToken(response.accessToken)));
  }

  refreshAccessToken(): Observable<AuthRefreshResponse> {
    return this.http
      .post<AuthRefreshResponse>(
        `${environment.apiRestAuth}refresh-token`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((response) => this.setAccessToken(response.accessToken)),
        catchError((error) => {
          this.clearAccessToken();
          return throwError(() => error);
        }),
      );
  }

  ensureAuthenticated(): Observable<boolean> {
    const token = this.getAccessToken();
    if (!token) {
      return of(false);
    }

    if (!this.isTokenExpired(token)) {
      return of(true);
    }

    return this.refreshAccessToken().pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${environment.apiRestAuth}logout`, null, { withCredentials: true })
      .pipe(
        catchError((error) => {
          this.clearAccessToken();
          return throwError(() => error);
        }),
        tap(() => this.clearAccessToken()),
      );
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  private setAccessToken(token: string): void {
    sessionStorage.setItem(this.accessTokenKey, token);
  }

  private clearAccessToken(): void {
    sessionStorage.removeItem(this.accessTokenKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      if (!decoded.exp) {
        return true;
      }
      return Date.now() >= decoded.exp * 1000;
    } catch {
      return true;
    }
  }
}
