import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fechaCita', standalone: false })
export class FechaCitaPipe implements PipeTransform {
  transform(valor: string | Date): string {
    const f = new Date(valor);
    if (isNaN(f.getTime())) return '';
    return f.toLocaleString('es-PE', {
      weekday: 'long', day: '2-digit', month: 'long',
      hour: '2-digit', minute: '2-digit',
    });
  }
}
