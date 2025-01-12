import { Operacao } from "../models/operacao.model";

export interface OperacoesRepository {
  getOperacao(): Promise<Operacao[]>;
  setOperacao(operacao: Operacao): Promise<void>;
}
