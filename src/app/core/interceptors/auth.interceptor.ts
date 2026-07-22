import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuthRequest(req)) {
      return next.handle(req);
    }

    const token = this.auth.getAccessToken();
    const request = token ? this.addAuthorizationHeader(req, token) : req;

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      }),
    );
  }

  private isAuthRequest(req: HttpRequest<any>): boolean {
    return req.url.endsWith('/login') || req.url.endsWith('/refresh-token');
  }

  private addAuthorizationHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter((accessToken) => accessToken != null),
        take(1),
        switchMap((accessToken) => next.handle(this.addAuthorizationHeader(req, accessToken!))),
      );
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.auth.refreshAccessToken().pipe(
      switchMap((response) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(response.accessToken);
        return next.handle(this.addAuthorizationHeader(req, response.accessToken));
      }),
      catchError((refreshError) => {
        this.isRefreshing = false;
        this.auth.logout();
        return throwError(() => refreshError);
      }),
    );
  }
}
