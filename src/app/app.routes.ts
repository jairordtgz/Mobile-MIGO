import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
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
      },
      {
        path: 'reestablecer-password',
        loadComponent: () => import('./pages/auth/reestablecer-password/reestablecer-password.page').then( m => m.ReestablecerPasswordPage)
      },
      {
        path: 'recuperar-password',
        loadComponent: () => import('./pages/auth/recuperar-password/recuperar-password.page').then( m => m.RecuperarPasswordPage)  
      }
    ]
  },

  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'panel',
        loadComponent: () => import('./pages/panel/panel.page').then(m => m.PanelPage)
      },
      {
        path: '**',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];