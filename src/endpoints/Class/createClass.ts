import { Request, Response } from "express";
import connection from "../../connection";
import { checkEmail } from "../../functions/checkEmail";
import { checkDate, formatDate } from "../../functions/validDate";

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

const createClass = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
      const input: Class = {
          id: req.body.id,
          nome: req.body.nome,
          data_inicio: req.body.data_inicio,
          data_fim: req.body.data_fim,
          modulo: req.body.modulo,
          tipo: req.body.tipo
      }
      if(!input.id || !input.nome || !input.data_inicio || !input.data_fim || !input.modulo || !input.tipo){
          errorCode = 422;
          throw new Error("preencha os campos corretamente")
      }
      if(input.tipo !== TIPO_TURMA.INTEGRAL && input.tipo !== TIPO_TURMA.NOTURNO){
          errorCode = 422;
          throw new Error('os valores possíveis são "integral" e "noturno"')
      }
      if(input.tipo === TIPO_TURMA.NOTURNO){
          input.nome = input.nome+='-na-night'
      }
      await connection.raw(`
        INSERT INTO TURMA (id, nome, data_inicio, data_fim, modulo)
        VALUES(
            ${input.id},
            '${input.nome}',
            '${input.data_inicio}',
            '${input.data_fim}',
            ${input.modulo},
        )
      `)
            res.status(201).send({message:"Turma criada com sucesso"})
    
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
}

export default createClass;