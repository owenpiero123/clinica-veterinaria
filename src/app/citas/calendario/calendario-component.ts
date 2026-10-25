import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CitaService } from '../services/cita.service';
import { MascotaService } from '../../mascotas/services/mascota.service';
import { Cita } from '../../shared/models/cita';

interface Slot {
  iso: string;
  etiqueta: string;
  ocupado: boolean;
  pasado: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  private citaSrv = inject(CitaService);
  private mascotaSrv = inject(MascotaService);
  private router = inject(Router);

  readonly horas = [9, 10, 11, 12, 14, 15, 16, 17];
  readonly diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  citas$ = this.citaSrv.listar();

  mes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  celdas: (Date | null)[] = [];
  seleccionado: Date | null = null;

  constructor() {
    this.construir();
  }

  get tituloMes(): string {
    return this.mes.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' });
  }

  tituloDia(d: Date): string {
    if (!d) return '';
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${diasSemana[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]}`;
  }

  cambiarMes(delta: number): void {
    this.mes = new Date(this.mes.getFullYear(), this.mes.getMonth() + delta, 1);
    this.seleccionado = null;
    this.construir();
  }

  seleccionar(d: Date): void {
    this.seleccionado = d;
  }

  esHoy(d: Date): boolean {
    return d.toDateString() === new Date().toDateString();
  }

  mismoDia(a: Date, b: Date): boolean {
    return a.toDateString() === b.toDateString();
  }

  citasDelDia(d: Date, lista: Cita[]): Cita[] {
    return lista
      .filter(c => c.estado !== 'cancelada' && new Date(c.fecha).toDateString() === d.toDateString())
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  slots(d: Date, lista: Cita[]): Slot[] {
    return this.horas.map(h => {
      const f = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h);
      const iso = f.toISOString();
      return {
        iso,
        etiqueta: `${String(h).padStart(2, '0')}:00`,
        ocupado: lista.some(c => c.estado !== 'cancelada' && c.fecha === iso),
        pasado: f.getTime() < Date.now(),
      };
    });
  }

  trackSlot(_: number, s: Slot): string {
    return s.iso;
  }

  agendar(s: Slot): void {
    this.router.navigate(['/citas/nueva'], { queryParams: { fecha: s.iso } });
  }

  nombreMascota(id: number): string {
    return this.mascotaSrv.obtener(id)?.nombre ?? 'Mascota no encontrada';
  }

  atender(c: Cita): void {
    this.citaSrv.cambiarEstado(c.id, 'atendida');
  }

  cancelar(c: Cita): void {
    this.citaSrv.cambiarEstado(c.id, 'cancelada');
  }

  private construir(): void {
    const y = this.mes.getFullYear();
    const m = this.mes.getMonth();
    
    // Obtenemos el día de la semana específico del DÍA 1 del mes
    const primerDia = new Date(y, m, 1);
    const offset = (primerDia.getDay() + 6) % 7; // Lunes = 0, Domingo = 6
    
    // Total exacto de días del mes
    const total = new Date(y, m + 1, 0).getDate();
    
    this.celdas = [
      ...Array<null>(offset).fill(null),
      ...Array.from({ length: total }, (_, i) => new Date(y, m, i + 1))
    ];
  }
}
