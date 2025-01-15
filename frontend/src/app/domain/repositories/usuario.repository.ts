import { Usuario } from "../models/usuario.model";

export interface UsuarioRepository {
  getUsuario(): Promise<Usuario[]>;
}
