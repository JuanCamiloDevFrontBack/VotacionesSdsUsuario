import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap, map, of } from 'rxjs';
import { AUTH_API_URL } from './auth.config';

export interface LoginCredentials {
  email: string;
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
    private readonly http: HttpClient,
    @Inject(AUTH_API_URL) private readonly authApiUrl: string,
  ) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.get<UsersResponse>(`${this.authApiUrl}/auth`).pipe(
      map((arrayUsers: UsersResponse) => {
        const user = arrayUsers.users.find(
          (u: AuthUser) => u.email === credentials.email && u.password === credentials.password
        );
        if (!user) {
          throw new Error('Usuario o contraseña incorrectos');
        }
        return user;
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
