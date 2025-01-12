export class Veiculo {
    constructor(
      public id_veiculo: number,
      public modelo: string,
      public marca: string,
      public placa: string,
      public numero_cnh: string,
      public situacao_veiculo: string, // exemplo: "Em circulação", "Apreendido"
      public id_condutor: number,
    ) {}
  }
  