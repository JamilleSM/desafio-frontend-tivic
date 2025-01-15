import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../../core/entities/usuario.entity';
import { UsuarioDataSource } from '../usuario.data-sources';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';

@Injectable({ providedIn: 'root' })
export class UsuarioRepositoryImpl implements UsuarioRepository {
  dataSource = inject(UsuarioDataSource);

  async getUsuario(): Promise<Usuario[]> {
    return lastValueFrom(this.dataSource.getUsuario());
  }
}
