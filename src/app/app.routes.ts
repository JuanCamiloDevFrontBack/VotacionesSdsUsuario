import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then((m) => m.AuthPageComponent),
  },
  {
    path: 'votacion',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/votacion.component').then((m) => m.VotacionPageComponent),
  },
  {
    // La pantalla con token que abrirán los salvatorianos para votar
    path: 'votacion-inicial',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/inicio-votacion/inicio-votacion.component').then((m) => m.InicioVotacionComponent),
  },
  /*{
    // La pantalla con token que abrirán los salvatorianos para votar en la terna provincial
    path: 'votacion-seleccion-provincial',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/votacion-provincial/votacion-provincial.component').then((m) => m.VotacionProvincialComponent),
  },
  {
    path: 'votacion-reporte-terna',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/terna-seleccionada/terna-seleccionada.component').then((m) => m.TernaSeleccionadaComponent),
  },
  {
    path: 'votacion-seleccion',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/terna-seleccionada/terna-seleccionada.component').then((m) => m.TernaSeleccionadaComponent),
  },
  {
    path: 'votacion-terna',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/votacion/votacion-provincial/votacion-provincial.component').then((m) => m.VotacionProvincialComponent),
  },*/
  {
    path: 'reportes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/reportes/reportes.component').then((m) => m.ReportesPageComponent),
  },
  {
    path: 'salvatorianos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/salvatorianos/salvatorianos.component').then((m) => m.SalvatorianosPageComponent),
  },
  /*{
    // La pantalla para gestionar los nombramientos (crear, editar, eliminar)
    path: 'nombramientos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/nombramientos/nombramientos.component').then((m) => m.NombramientosPageComponent),
  },*/
  { path: '**', redirectTo: 'auth' },
];
