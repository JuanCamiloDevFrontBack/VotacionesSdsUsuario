import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginCredentials {
  username: string;
  password: string;
}

interface UsersResponse {
  users: AuthUser[];
}

interface AuthUser {
  id: number;
  email: string;
  password: string;
  accessToken: string;
  refreshToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  constructor(
    private readonly http: HttpClient
  ) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.get<UsersResponse>(`${environment.apiRestAuth}login`).pipe(
      map((arrayUsers: UsersResponse) => {
        const user = arrayUsers.users.find(
          (u: AuthUser) => u.email === credentials.username && u.password === credentials.password
        );
        if (!user) {
          throw new Error('Usuario o contraseña incorrectos');
        }
        return user;
      }),
      tap((user) => this.setToken(user.accessToken))
    );
  }

  loginBackend(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${environment.apiRestAuth}login`, credentials).pipe(
      map((arrayUsers: any) => {
        console.log('arrayUsers:', arrayUsers);
        /*const user = arrayUsers.users.find(
          (u: AuthUser) => u.email === credentials.email && u.password === credentials.password
        );
        if (!user) {
          throw new Error('Usuario o contraseña incorrectos');
        }
        return user;*/
        return arrayUsers;
      }),
      tap((user) => this.setToken(user.accessToken))
    );
  }

  logout(): void {
    this.clear();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private clear(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
