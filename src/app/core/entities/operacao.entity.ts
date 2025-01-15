export class Operacao {
    constructor(
      public id: string,
      public nomeResponsavel: string,
      public dataInicio: Date,
      public dataFinal: Date,
      public local: string,
      public status: string, // exemplo: "Em andamento", "Concluída"
      public observacoes: string,
    ) {}
  }
  