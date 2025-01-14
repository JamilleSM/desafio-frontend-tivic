import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Comentario } from '../../core/entities/comentario.entity';
import { ComentarioDataSource } from '../comentario.data-sources';
import { ComentarioRepository } from '../../domain/repositories/comentario.repository';

@Injectable({ providedIn: 'root' })
export class ComentarioRepositoryImpl implements ComentarioRepository {
  constructor(private dataSource: ComentarioDataSource) {}

  async getComentario(): Promise<Comentario[]> {
    return lastValueFrom(this.dataSource.getComentario());
  }

  async setComentario(comentario: Comentario): Promise<void> {
    await lastValueFrom(this.dataSource.setComentario(comentario));
  }

  async updateComentario(id: string, comentario: Comentario): Promise<void> {
    await lastValueFrom(this.dataSource.updateComentario(id, comentario));
  }

  async deleteComentario(id: string): Promise<void> {
    await lastValueFrom(this.dataSource.deleteComentario(id));
  }
}
