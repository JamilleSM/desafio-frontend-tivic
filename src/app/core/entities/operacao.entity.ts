export class Operacao {
    constructor(
      public idOperacao: number,
      public nomeResponsavel: string,
      public dataInicio: Date,
      public dataFinal: Date,
      public local: string,
      public status: string, // exemplo: "Em andamento", "Concluída"
      public observacoes: string,
    ) {}
  }
  