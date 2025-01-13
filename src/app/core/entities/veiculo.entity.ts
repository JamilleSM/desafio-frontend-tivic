export class Veiculo {
    constructor(
      public id: number,
      public modelo: string,
      public marca: string,
      public placa: string,
      public numeroCnh: string,
      public situacaoVeiculo: string, // exemplo: "Em circulação", "Apreendido"
      public idCondutor: number,
    ) {}
  }
  