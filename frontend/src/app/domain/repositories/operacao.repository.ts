import { Operacao } from "../models/operacao.model";

export interface OperacoesRepository {
  getOperacao(): Promise<Operacao[]>;
  setOperacao(operacao: Operacao): Promise<Operacao>;
  updateOperacao(id: string, operacao: Operacao): Promise<void>;
  deleteOperacao(id: string): Promise<void>;
}
