import { Request, Response } from "express";
import { insertTeacher } from "../../data/Teacher/insertTeacher";
import { checkEmail } from "../../functions/checkEmail";
import { checkDate, formatDate } from "../../functions/validDate";
import { Teacher } from "../../types/teacher";


const createTeacher = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const { name, email, birthdate } = req.body as Teacher;

    // VALIDAÇÕES

    // Campos do body
    if (!name || !email || !birthdate ) {
        errorCode = 422;
        throw new Error(
          "Preencha todas as informações necessárias do professor."
        );
      }

    // Formato de e-mail 
    if (!checkEmail(email)) {
      errorCode = 422;
      throw new Error(`Digite um formato de e-mail válido`);
    }

    // Se o formato de data é DD/MM/YYYY para o formato do SQL
    const checkingDate = checkDate(birthdate);
      if (!checkingDate) {
        errorCode = 406;
        throw new Error("Coloque uma data formato DD/MM/YYYY");
      }
      req.body.birthdate = formatDate(birthdate);
  
    // Inserindo as infos no Banco de Dados:
    await insertTeacher(req.body);
    // respostas:
    res.status(201).send({
      message: `Professor ${name} registrado`,
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
}

export default createTeacher;