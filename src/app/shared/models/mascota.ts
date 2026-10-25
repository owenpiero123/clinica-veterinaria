import { Dueno } from './dueno';

export type Especie = 'perro' | 'gato' | 'ave' | 'otro';

export class Mascota {
  constructor(
    public id: number,
    public nombre: string,
    public especie: Especie,
    public raza: string,
    public fechaNacimiento: string,
    public dueno: Dueno
  ) {}

  get edadEnAnios(): number {
    const hoy = new Date();
    const nac = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return Math.max(0, edad);
  }
}
