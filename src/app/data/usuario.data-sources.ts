import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../core/entities/usuario.entity';

@Injectable({ providedIn: 'root' })
export class UsuarioDataSource {
  private apiUrl = 'http://localhost:3000/';
  http = inject(HttpClient);

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuario`);
  }
}
