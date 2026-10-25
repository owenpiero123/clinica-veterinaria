import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'sesion';
  private usuario$ = new BehaviorSubject<string | null>(sessionStorage.getItem(this.KEY));

  readonly sesion$ = this.usuario$.asObservable();

  get autenticado(): boolean {
    return this.usuario$.value !== null;
  }

  /** Login simulado: no hay backend, es solo para el trabajo. */
  login(usuario: string, clave: string): boolean {
    if (usuario === 'admin' && clave === 'clinica123') {
      sessionStorage.setItem(this.KEY, usuario);
      this.usuario$.next(usuario);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.KEY);
    this.usuario$.next(null);
  }
}