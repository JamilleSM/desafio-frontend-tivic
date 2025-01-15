import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../core/entities/comentario.entity';
import { API_URL } from '../../environment';

@Injectable({ providedIn: 'root' })
export class ComentarioDataSource {
  http = inject(HttpClient);
  
  getComentario(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${API_URL}comentario`);
  }

  setComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${API_URL}comentario`, comentario);
  }

  updateComentario(id: string, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${API_URL}comentario/${id}`, comentario);
  }

  deleteComentario(id: string): Observable<Comentario> {
    return this.http.delete<Comentario>(`${API_URL}comentario/${id}`, {});
  }
}
