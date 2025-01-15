import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Operacao } from '../core/entities/operacao.entity';
import { Observable } from 'rxjs';
import { API_URL } from '../../environment';

@Injectable({ providedIn: 'root' })
export class OperacoesDataSource {
  http = inject(HttpClient);

  getOperacoes(): Observable<Operacao[]> {
    return this.http.get<Operacao[]>(`${API_URL}operacao`);
  }

  setOperacao(operacao: Operacao): Observable<Operacao> {
    return this.http.post<Operacao>(`${API_URL}operacao`, operacao);
  }

  updateOperacao(id: string, operacao: Operacao): Observable<Operacao> {
    return this.http.put<Operacao>(`${API_URL}operacao/${id}`, operacao);
  }

  deleteOperacao(id: string): Observable<Operacao> {
    return this.http.delete<Operacao>(`${API_URL}operacao/${id}`, {});
  }
}
