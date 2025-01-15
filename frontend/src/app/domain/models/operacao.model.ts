export interface Operacao {
    id: string,
    nomeResponsavel: string,
    dataInicio: Date,
    dataFinal: Date,
    local: string,
    status: string, // exemplo: "Em andamento", "Concluída"
    observacoes: string,
  }
  