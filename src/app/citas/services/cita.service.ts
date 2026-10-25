import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita, EstadoCita } from '../../shared/models/cita';

export interface DatosCita {
  mascotaId: number;
  fecha: string; // ISO
  motivo: string;
}

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly KEY = 'citas';
  private citas$ = new BehaviorSubject<Cita[]>(this.cargar());

  listar(): Observable<Cita[]> {
    return this.citas$.asObservable();
  }

  porMascota(mascotaId: number): Cita[] {
    return this.citas$.value
      .filter(c => c.mascotaId === mascotaId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  /** Devuelve null si el horario ya está ocupado. */
  agendar(d: DatosCita): Cita | null {
    const ocupado = this.citas$.value.some(
      c => c.estado !== 'cancelada' && c.fecha === d.fecha
    );
    if (ocupado) return null;
    const cita: Cita = { id: Date.now(), ...d, estado: 'pendiente' };
    this.actualizar([...this.citas$.value, cita]);
    return cita;
  }

  cambiarEstado(id: number, estado: EstadoCita, diagnostico?: string): void {
    this.actualizar(
      this.citas$.value.map(c =>
        c.id === id ? { ...c, estado, diagnostico: diagnostico ?? c.diagnostico } : c
      )
    );
  }

  private actualizar(lista: Cita[]): void {
    this.citas$.next(lista);
    localStorage.setItem(this.KEY, JSON.stringify(lista));
  }

  private cargar(): Cita[] {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) {
      const hoy = new Date();
      const fechaManana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1, 10, 0, 0).toISOString();
      const fechaAyer = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1, 11, 0, 0).toISOString();

      const iniciales: Cita[] = [
        {
          id: 101,
          mascotaId: 1,
          fecha: fechaManana,
          motivo: 'Control de vacunas y desparasitación',
          estado: 'pendiente'
        },
        {
          id: 102,
          mascotaId: 1,
          fecha: fechaAyer,
          motivo: 'Consulta médica general',
          estado: 'atendida',
          diagnostico: 'Paciente estable, tratamiento finalizado con éxito.'
        },
        {
          id: 103,
          mascotaId: 2,
          fecha: fechaManana,
          motivo: 'Revisión periódica y corte de uñas',
          estado: 'pendiente'
        }
      ];
      localStorage.setItem(this.KEY, JSON.stringify(iniciales));
      return iniciales;
    }
    return JSON.parse(raw) as Cita[];
  }
}