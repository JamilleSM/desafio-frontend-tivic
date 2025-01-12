export class Abordagem {
    constructor(
      public id_abordagem: number,
      public id_veiculo: number,
      public id_operacao: number,
      public teste_bafometro: string,
      public nivel_alccolemia: string,
      public data_recolhimento: Date,
      public valor_multa: number,
    ) {}
  }
  