import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.ensureAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      }),
      catchError(() => of(this.router.createUrlTree(['auth']))),
    );
  }
}
