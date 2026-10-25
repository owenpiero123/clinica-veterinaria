import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { RegistroMascotaComponent } from './registro-mascota/registro-mascota-component';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas-component';
import { HistorialMascotaComponent } from './historial-mascota/historial-mascota-component';

const routes: Routes = [
  { path: '', component: ListaMascotasComponent },
  { path: 'nueva', component: RegistroMascotaComponent },
  { path: ':id/historial', component: HistorialMascotaComponent },
];

@NgModule({
  declarations: [RegistroMascotaComponent, ListaMascotasComponent, HistorialMascotaComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
})
export class MascotasModule {}
