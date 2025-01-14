import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Veiculo } from '../../core/entities/veiculo.entity';
import { VeiculoRepository } from '../../domain/repositories/veiculo.repository';
import { VeiculoDataSource } from '../veiculo.data-sources';

@Injectable({ providedIn: 'root' })
export class VeiculoRepositoryImpl implements VeiculoRepository {
  constructor(private dataSource: VeiculoDataSource) {}

  async getVeiculo(): Promise<Veiculo[]> {
    return lastValueFrom(this.dataSource.getVeiculo());
  }

  async setVeiculo(veiculo: Veiculo): Promise<void> {
    await lastValueFrom(this.dataSource.setVeiculo(veiculo));
  }

  async updateVeiculo(id: string, veiculo: Veiculo): Promise<void> {
    await lastValueFrom(this.dataSource.updateVeiculo(id, veiculo));
  }

  async deleteVeiculo(id: string): Promise<void> {
    await lastValueFrom(this.dataSource.deleteVeiculo(id));
  }
}
