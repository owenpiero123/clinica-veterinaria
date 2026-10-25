import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/** Resalta el elemento si la cita es en las próximas `horas` horas. */
@Directive({ selector: '[appResaltarCitaProxima]', standalone: false })
export class ResaltarCitaProximaDirective implements OnChanges {
  @Input('appResaltarCitaProxima') fecha!: string;
  @Input() horas = 24;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges(): void {
    const diff = new Date(this.fecha).getTime() - Date.now();
    const proxima = diff > 0 && diff <= this.horas * 3600 * 1000;
    this.el.nativeElement.style.backgroundColor = proxima ? '#fff3cd' : '';
    this.el.nativeElement.style.fontWeight = proxima ? '600' : '';
  }
}
