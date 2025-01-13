import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abordagem } from '../core/entities/abordagem.entity';

@Injectable({ providedIn: 'root' })
export class AbordagemDataSource {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAbordagem(): Observable<Abordagem[]> {
    return this.http.get<Abordagem[]>(`${this.apiUrl}abordagem`);
  }

  setAbordagem(abordagem: Abordagem): Observable<Abordagem> {
    return this.http.post<Abordagem>(`${this.apiUrl}abordagem`, abordagem);
  }

  updateAbordagem(id: string, abordagem: Abordagem): Observable<Abordagem> {
    return this.http.put<Abordagem>(`${this.apiUrl}abordagem/${id}`, abordagem);
  }

  deleteAbordagem(id: string): Observable<Abordagem> {
    return this.http.delete<Abordagem>(`${this.apiUrl}abordagem/${id}`, {});
  }
}
