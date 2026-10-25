export type EstadoCita = 'pendiente' | 'atendida' | 'cancelada';

export interface Cita {
  id: number;
  mascotaId: number;
  fecha: string; // ISO
  motivo: string;
  estado: EstadoCita;
  diagnostico?: string;
}
