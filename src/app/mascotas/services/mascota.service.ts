import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota, Especie } from '../../shared/models/mascota';
import { Dueno } from '../../shared/models/dueno';

export interface DatosMascota {
  nombre: string;
  especie: Especie;
  raza: string;
  fechaNacimiento: string;
  dueno: Dueno;
}

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private readonly KEY = 'mascotas';
  private mascotas$ = new BehaviorSubject<Mascota[]>(this.cargar());

  listar(): Observable<Mascota[]> {
    return this.mascotas$.asObservable();
  }

  obtener(id: number): Mascota | undefined {
    return this.mascotas$.value.find(m => m.id === id);
  }

  registrar(d: DatosMascota): Mascota {
    const m = new Mascota(Date.now(), d.nombre, d.especie, d.raza, d.fechaNacimiento, d.dueno);
    const lista = [...this.mascotas$.value, m];
    this.mascotas$.next(lista);
    this.guardar(lista);
    return m;
  }

  private cargar(): Mascota[] {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) {
      const iniciales: Mascota[] = [
        new Mascota(
          1,
          'Sam',
          'perro',
          'Pitbull',
          '2021-09-27',
          { nombre: 'Omar Chauca', telefono: '950609772', email: 'omar.chauca@hotmail.com' }
        ),
        new Mascota(
          2,
          'Luna',
          'gato',
          'Siamés',
          '2023-03-15',
          { nombre: 'Carlos Mendoza', telefono: '987654321', email: 'carlos.mendoza@gmail.com' }
        )
      ];
      this.guardar(iniciales);
      return iniciales;
    }
    return (JSON.parse(raw) as Mascota[]).map(
      o => new Mascota(o.id, o.nombre, o.especie, o.raza, o.fechaNacimiento, o.dueno)
    );
  }

  private guardar(lista: Mascota[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(lista));
  }
}
