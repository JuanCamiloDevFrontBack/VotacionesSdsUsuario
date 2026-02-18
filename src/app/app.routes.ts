import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{ path: 'auth', loadComponent: () => import('./features/auth/+page.component').then(m => m.AuthPageComponent) },
	{ path: 'dashboard', loadComponent: () => import('./features/dashboard/+page.component').then(m => m.DashboardPageComponent) },
	{ path: 'votacion', loadComponent: () => import('./features/votacion/+page.component').then(m => m.VotacionPageComponent) },
	{ path: 'reportes', loadComponent: () => import('./features/reportes/+page.component').then(m => m.ReportesPageComponent) },
	{ path: 'sacerdotes', loadComponent: () => import('./features/sacerdotes/+page.component').then(m => m.SacerdotesPageComponent) },
	{ path: 'administradores', loadComponent: () => import('./features/administradores/+page.component').then(m => m.AdministradoresPageComponent) },
	{ path: 'nombramientos', loadComponent: () => import('./features/nombramientos/+page.component').then(m => m.NombramientosPageComponent) },
	{ path: '**', redirectTo: 'auth' }
];
