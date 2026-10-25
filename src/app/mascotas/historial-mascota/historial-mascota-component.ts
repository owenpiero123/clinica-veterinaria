import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';
import { CitaService } from '../../citas/services/cita.service';
import { MascotaService } from '../services/mascota.service';
import { Cita, EstadoCita } from '../../shared/models/cita';

type Filtro = 'todas' | EstadoCita;

@Component({
  selector: 'app-historial-mascota',
  standalone: false,
  templateUrl: './historial-mascota.component.html',
  styleUrl: './historial-mascota.component.css',
})
export class HistorialMascotaComponent {
  private route = inject(ActivatedRoute);
  private mascotaSrv = inject(MascotaService);
  private citaSrv = inject(CitaService);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly mascota = this.mascotaSrv.obtener(this.id);

  filtro = new FormControl<Filtro>('todas', { nonNullable: true });
  diagnostico = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(5)],
  });
  atendiendo: number | null = null;

  citas$ = combineLatest([
    this.citaSrv.listar(),
    this.filtro.valueChanges.pipe(startWith(this.filtro.value)),
  ]).pipe(
    map(([lista, f]) =>
      lista
        .filter(c => c.mascotaId === this.id && (f === 'todas' || c.estado === f))
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
    )
  );

    puedeAtender(fechaCita: string): boolean {
    return new Date(fechaCita).getTime() <= Date.now();
  }

  iniciar(c: Cita): void {
    this.atendiendo = c.id;
    this.diagnostico.reset('');
  }

  confirmar(c: Cita): void {
    if (this.diagnostico.invalid) {
      this.diagnostico.markAsTouched();
      return;
    }
    this.citaSrv.cambiarEstado(c.id, 'atendida', this.diagnostico.value.trim());
    this.atendiendo = null;
  }

  cancelarEdicion(): void {
    this.atendiendo = null;
  }

  cancelarCita(c: Cita): void {
    this.citaSrv.cambiarEstado(c.id, 'cancelada');
  }
}