enum TIPO_TURMA {
  INTEGRAL = "integral",
  NOTURNO = "noturno"
}

export type Class = {
    id: number;
    nome: string;
    data_inicio: string;
    data_fim: string;
    modulo: number,
    tipo: TIPO_TURMA
  };