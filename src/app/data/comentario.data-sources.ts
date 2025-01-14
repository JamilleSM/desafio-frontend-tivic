import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../core/entities/comentario.entity';

@Injectable({ providedIn: 'root' })
export class ComentarioDataSource {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getComentario(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}comentario`);
  }

  setComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}comentario`, comentario);
  }

  updateComentario(id: string, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}comentario/${id}`, comentario);
  }

  deleteComentario(id: string): Observable<Comentario> {
    return this.http.delete<Comentario>(`${this.apiUrl}comentario/${id}`, {});
  }
}
