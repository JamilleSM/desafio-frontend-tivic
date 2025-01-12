export interface Operacao {
    idOperacao?: number,
    nomeResponsavel?: string,
    dataInicio?: Date,
    dataFinal?: Date,
    local?: string,
    status?: string, // exemplo: "Em andamento", "Concluída"
    observacoes?: string,
  }
  