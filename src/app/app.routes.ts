import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'invitado/ofertas',
    pathMatch: 'full',
  },
  
  {
    path: 'invitado/ofertas',
    loadComponent: () => import('./pages/invitado/ofertas/ofertas.page').then( m => m.OfertasPage)
  },
  
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'registro-conductor',
        loadComponent: () => import('./pages/auth/registro-conductor/registro-conductor.page').then( m => m.RegistroConductorPage)
      },
      {
        path: 'registro-vehiculo',
        loadComponent: () => import('./pages/auth/registro-vehiculo/registro-vehiculo.page').then( m => m.RegistroVehiculoPage)
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: 'invitado/ofertas',
  },
];