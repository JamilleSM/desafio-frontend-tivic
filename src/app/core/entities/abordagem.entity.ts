export class Abordagem {
    constructor(
      public id: string,
      public idOperacao: string,
      public idVeiculo: string,
      public testeBafometro: string,
      public nivelAlcool: string,
      public nome: string,
      public rg: string,
      public cpf: string,
      public dataNascimento: Date,
      public dataRecolhimento: Date,
      public valorMulta: number,
    ) {}
  }
  