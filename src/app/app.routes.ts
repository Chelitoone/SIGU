// src/app/app.routes.ts
import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Home (standalone con lazy)
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },

  // Admisiones
  {
    path: 'admisiones',
    loadComponent: () =>
      import('./pages/admisiones/admisiones.component').then(m => m.AdmisionesComponent),
  },

  // Académico
  {
    path: 'academico',
    loadComponent: () =>
      import('./pages/academico/academico.component').then(m => m.AcademicoComponent),
  },

  // Investigación
  {
    path: 'investigacion',
    loadComponent: () =>
      import('./pages/investigacion/investigacion.component').then(m => m.InvestigacionComponent),
  },
  // Extensión
  {
    path: 'estudiante',
    loadComponent: () =>
      import('./pages/estudiante/estudiante.component').then(m => m.EstudianteComponent),
  },
  {
    path: 'aspirante',
    loadComponent: () =>
      import('./pages/aspirante/aspirante.component').then(m => m.AspiranteComponent),
  },
  {
    path: 'profesor',
    loadComponent: () =>
      import('./pages/profesor/profesor.component').then(m => m.ProfesorComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then(m => m.AdminComponent),
  },

  // Ejemplo de lazy con features (puedes dejarlo si tu profe lo pide)
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES),
  },

  {
    path: 'admin',
    canMatch: [() => import('./services/admin.guard').then(g => g.adminOnlyGuard)],
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {

  path: 'crear-usuario',
  loadComponent: () =>
    import('./crear-usuario/crear-usuario.component').then(m => m.CrearUsuarioComponent),
  },

  // 404 (Not Found)
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
