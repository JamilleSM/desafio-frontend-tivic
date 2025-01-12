import { Injectable } from '@angular/core';
import { OperacoesDataSource } from '../operacao.data-sources';
import { Operacao } from '../../core/entities/operacao.entity';
import { OperacoesRepository } from '../../domain/repositories/operacao.repository';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperacoesRepositoryImpl implements OperacoesRepository {
  constructor(private dataSource: OperacoesDataSource) {}

  async getOperacao(): Promise<Operacao[]> {
    return lastValueFrom(this.dataSource.getOperacoes());
  }

  async setOperacao(operacao: Operacao): Promise<void> {
    await lastValueFrom(this.dataSource.saveOperacao(operacao));
  }
}
