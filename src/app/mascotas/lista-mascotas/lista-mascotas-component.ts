import { Component, inject } from '@angular/core';
import { MascotaService } from '../services/mascota.service';

@Component({
  selector: 'app-lista-mascotas',
  standalone: false,
  templateUrl: './lista-mascotas.component.html'
})
export class ListaMascotasComponent {
  private servicio = inject(MascotaService);
  mascotas$ = this.servicio.listar();
}