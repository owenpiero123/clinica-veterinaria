import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { CalendarioComponent } from './calendario/calendario-component';
import { FormularioCitaComponent } from './formulario-cita/formulario-cita-component';

const routes: Routes = [
  { path: '', component: CalendarioComponent },
  { path: 'nueva', component: FormularioCitaComponent },
];

@NgModule({
  declarations: [CalendarioComponent, FormularioCitaComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
})
export class CitasModule {}
