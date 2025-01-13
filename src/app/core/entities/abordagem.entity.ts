export class Abordagem {
    constructor(
      public idAbordagem: number,
      public idVeiculo: number,
      public idOperacao: number,
      public testeBafometro: string,
      public nivelAlcool: string,
      public dataRecolhimento: Date,
      public valorMulta: number,
    ) {}
  }
  