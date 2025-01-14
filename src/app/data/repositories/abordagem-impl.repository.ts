import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Abordagem } from '../../core/entities/abordagem.entity';
import { AbordagemRepository } from '../../domain/repositories/abordagem.repository';
import { AbordagemDataSource } from '../abordagem.data-sources';

@Injectable({ providedIn: 'root' })
export class AbordagemRepositoryImpl implements AbordagemRepository {
  constructor(private dataSource: AbordagemDataSource) {}

  async getAbordagem(): Promise<Abordagem[]> {
    return lastValueFrom(this.dataSource.getAbordagem());
  }

  async setAbordagem(abordagem: Abordagem): Promise<Abordagem> {
    return await lastValueFrom(this.dataSource.setAbordagem(abordagem));
  }

  async updateAbordagem(id: string, abordagem: Abordagem): Promise<void> {
    await lastValueFrom(this.dataSource.updateAbordagem(id, abordagem));
  }

  async deleteAbordagem(id: string): Promise<void> {
    await lastValueFrom(this.dataSource.deleteAbordagem(id));
  }
}
