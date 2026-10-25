import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../models/cita';

@Pipe({ name: 'estadoCita', standalone: false })
export class EstadoCitaPipe implements PipeTransform {
  private etiquetas: Record<EstadoCita, string> = {
    pendiente: '⏳ Pendiente',
    atendida: '✅ Atendida',
    cancelada: '❌ Cancelada',
  };

  transform(estado: EstadoCita): string {
    return this.etiquetas[estado] ?? estado;
  }
}
