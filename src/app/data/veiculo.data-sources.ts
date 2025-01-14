import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from '../core/entities/veiculo.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VeiculoDataSource {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getVeiculo(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}veiculo`);
  }

  setVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.apiUrl}veiculo`, veiculo);
  }

  updateVeiculo(id: string, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}veiculo/${id}`, veiculo);
  }

  deleteVeiculo(id: string): Observable<Veiculo> {
    return this.http.delete<Veiculo>(`${this.apiUrl}veiculo/${id}`, {});
  }
}
