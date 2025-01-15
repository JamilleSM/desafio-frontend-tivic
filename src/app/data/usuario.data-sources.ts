import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../core/entities/usuario.entity';
import { API_URL } from '../../environment';

@Injectable({ providedIn: 'root' })
export class UsuarioDataSource {
  http = inject(HttpClient);

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}usuario`);
  }
}
