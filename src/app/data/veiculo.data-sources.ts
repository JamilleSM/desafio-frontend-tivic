import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Veiculo } from '../core/entities/veiculo.entity';
import { Observable } from 'rxjs';
import { API_URL } from '../../environment';

@Injectable({ providedIn: 'root' })
export class VeiculoDataSource {
  http = inject(HttpClient);

  getVeiculo(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${API_URL}veiculo`);
  }

  setVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${API_URL}veiculo`, veiculo);
  }

  updateVeiculo(id: string, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${API_URL}veiculo/${id}`, veiculo);
  }

  deleteVeiculo(id: string): Observable<Veiculo> {
    return this.http.delete<Veiculo>(`${API_URL}veiculo/${id}`, {});
  }
}
