import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../services/cita.service';
import { MascotaService } from '../../mascotas/services/mascota.service';

@Component({
  selector: 'app-formulario-cita',
  standalone: false,
  templateUrl: './formulario-cita.component.html',
})
export class FormularioCitaComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private citaSrv = inject(CitaService);
  private mascotaSrv = inject(MascotaService);

  mascotas$ = this.mascotaSrv.listar();
  fecha = this.route.snapshot.queryParamMap.get('fecha') ?? '';
  error = '';

  form = this.fb.nonNullable.group({
    mascotaId: [0, [Validators.min(1)]],
    motivo: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor() {
    if (!this.fecha) {
      this.router.navigate(['/citas']);
    }
  }

  invalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { mascotaId, motivo } = this.form.getRawValue();
    const cita = this.citaSrv.agendar({ mascotaId, fecha: this.fecha, motivo });
    if (!cita) {
      this.error = 'Ese horario ya fue ocupado. Elige otro.';
      return;
    }
    this.router.navigate(['/citas']);
  }
}
