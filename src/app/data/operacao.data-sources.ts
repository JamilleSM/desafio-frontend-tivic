import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operacao } from '../core/entities/operacao.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperacoesDataSource {
  private apiUrl = 'http://localhost:3000/operacao';

  constructor(private http: HttpClient) {}

  getOperacoes(): Observable<Operacao[]> {
    return this.http.get<Operacao[]>(this.apiUrl);
  }

  saveOperacao(operacao: Operacao): Observable<Operacao> {
    return this.http.post<Operacao>(this.apiUrl, operacao);
  }
}
