export interface Veiculo {
  id: string,
  modelo: string,
  marca: string,
  placa: string,
  numeroCnh: string,
  situacaoVeiculo: string, // exemplo: "Em circulação", "Apreendido"
  idCondutor: number,
}
 