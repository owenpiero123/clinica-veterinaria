import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'mascotas',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./mascotas/mascotas-module').then(m => m.MascotasModule),
  },
  {
    path: 'citas',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./citas/citas-module').then(m => m.CitasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}