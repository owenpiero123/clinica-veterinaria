import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoCitaPipe } from './pipes/estado-cita-pipe';
import { FechaCitaPipe } from './pipes/fecha-cita-pipe';
import { ResaltarCitaProximaDirective } from './directives/resaltar-cita-proxima-directive';

const EXPORTABLES = [EstadoCitaPipe, FechaCitaPipe, ResaltarCitaProximaDirective];

@NgModule({
  declarations: EXPORTABLES,
  imports: [CommonModule],
  exports: EXPORTABLES,
})
export class SharedModule {}
