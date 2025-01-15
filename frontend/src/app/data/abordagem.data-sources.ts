import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abordagem } from '../core/entities/abordagem.entity';
import { API_URL } from '../../environment';

@Injectable({ providedIn: 'root' })
export class AbordagemDataSource {
  http = inject(HttpClient);

  getAbordagem(): Observable<Abordagem[]> {
    return this.http.get<Abordagem[]>(`${API_URL}abordagem`);
  }

  setAbordagem(abordagem: Abordagem): Observable<Abordagem> {
    return this.http.post<Abordagem>(`${API_URL}abordagem`, abordagem);
  }

  updateAbordagem(id: string, abordagem: Abordagem): Observable<Abordagem> {
    return this.http.put<Abordagem>(`${API_URL}abordagem/${id}`, abordagem);
  }

  deleteAbordagem(id: string): Observable<Abordagem> {
    return this.http.delete<Abordagem>(`${API_URL}abordagem/${id}`, {});
  }
}
