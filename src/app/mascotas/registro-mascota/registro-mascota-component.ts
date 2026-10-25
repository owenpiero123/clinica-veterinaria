import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from '../services/mascota.service';
import { Especie } from '../../shared/models/mascota';

// Validador personalizado: no permite fechas posteriores al día de hoy
function fechaNoFuturaValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const hoyStr = new Date().toLocaleDateString('en-CA');
  return control.value > hoyStr ? { fechaFutura: true } : null;
}

@Component({
  selector: 'app-registro-mascota',
  standalone: false,
  templateUrl: './registro-mascota.component.html'
})
export class RegistroMascotaComponent {
  private fb = inject(FormBuilder);
  private servicio = inject(MascotaService);
  private router = inject(Router);

  especies: Especie[] = ['perro', 'gato', 'ave', 'otro'];
  hoy: string = new Date().toLocaleDateString('en-CA');

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    especie: ['perro' as Especie, Validators.required],
    raza: ['', Validators.required],
    fechaNacimiento: ['', [Validators.required, fechaNoFuturaValidator]],
    dueno: this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]]
    })
  });

  invalido(ruta: string): boolean {
    const c = this.form.get(ruta);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.servicio.registrar(this.form.getRawValue());
    this.router.navigate(['/mascotas']);
  }
}