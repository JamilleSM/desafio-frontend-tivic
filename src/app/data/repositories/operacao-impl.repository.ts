import { inject, Injectable } from '@angular/core';
import { OperacoesDataSource } from '../operacao.data-sources';
import { Operacao } from '../../core/entities/operacao.entity';
import { OperacoesRepository } from '../../domain/repositories/operacao.repository';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperacoesRepositoryImpl implements OperacoesRepository {
  dataSource = inject(OperacoesDataSource);

  async getOperacao(): Promise<Operacao[]> {
    return lastValueFrom(this.dataSource.getOperacoes());
  }

  async setOperacao(operacao: Operacao): Promise<Operacao> {
    return await lastValueFrom(this.dataSource.setOperacao(operacao));
  }

  async updateOperacao(id: string, operacao: Operacao): Promise<void> {
    await lastValueFrom(this.dataSource.updateOperacao(id, operacao));
  }

  async deleteOperacao(id: string): Promise<void> {
    await lastValueFrom(this.dataSource.deleteOperacao(id));
  }
}
