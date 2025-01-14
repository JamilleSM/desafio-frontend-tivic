import { Comentario } from "../models/comentario.model";

export interface ComentarioRepository {
  getComentario(): Promise<Comentario[]>;
  setComentario(comentario: Comentario): Promise<void>;
  updateComentario(id: string, comentario: Comentario): Promise<void>;
  deleteComentario(id: string): Promise<void>;
}
