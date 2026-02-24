import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/+page.component').then((m) => m.AuthPageComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/dashboard/+page.component').then((m) => m.DashboardPageComponent),
  },
  {
    path: 'votacion',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/+page.component').then((m) => m.VotacionPageComponent),
  },
  {
    path: 'reportes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/reportes/+page.component').then((m) => m.ReportesPageComponent),
  },
  {
    path: 'sacerdotes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/sacerdotes/+page.component').then((m) => m.SacerdotesPageComponent),
  },
  {
    path: 'administradores',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/administradores/+page.component').then(
        (m) => m.AdministradoresPageComponent,
      ),
  },
  {
    path: 'nombramientos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/nombramientos/+page.component').then((m) => m.NombramientosPageComponent),
  },
  { path: '**', redirectTo: 'auth' },
];
