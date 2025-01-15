
import { Veiculo } from "../models/veiculo.model";

export interface VeiculoRepository {
  getVeiculo(): Promise<Veiculo[]>;
  setVeiculo(veiculo: Veiculo): Promise<void>;
  updateVeiculo(id: string, veiculo: Veiculo): Promise<void>;
  deleteVeiculo(id: string): Promise<void>;
}
