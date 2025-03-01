
import { Abordagem } from "../models/abordagem.model";

export interface AbordagemRepository {
  getAbordagem(): Promise<Abordagem[]>;
  setAbordagem(abordagem: Abordagem): Promise<Abordagem>;
  updateAbordagem(id: string, abordagem: Abordagem): Promise<void>;
  deleteAbordagem(id: string): Promise<void>;
}
