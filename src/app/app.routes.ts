import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then((m) => m.AuthPageComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardPageComponent),
  },
  {
    path: 'votacion',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/votacion.component').then((m) => m.VotacionPageComponent),
  },
  {
    path: 'reportes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/reportes/reportes.component').then((m) => m.ReportesPageComponent),
  },
  {
    path: 'sacerdotes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/sacerdotes/sacerdotes.component').then((m) => m.SacerdotesPageComponent),
  },
  {
    path: 'administradores',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/administradores/administradores.component').then(
        (m) => m.AdministradoresPageComponent,
      ),
  },
  {
    path: 'nombramientos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/nombramientos/nombramientos.component').then((m) => m.NombramientosPageComponent),
  },
  { path: '**', redirectTo: 'auth' },
];
