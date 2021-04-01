import { Request, Response } from "express";
import { insertStudent } from "../../data/Student/insertStudent";
import { checkEmail } from "../../functions/checkEmail";
import { checkDate, formatDate } from "../../functions/validDate";
import { Student } from "../../types/student";


const createStudent = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const { name, email, birthdate } = req.body as Student;

    // VALIDAÇÕES

    // Campos do body
    if (!name || !email || !birthdate ) {
        errorCode = 422;
        throw new Error(
          "Preencha todas as informações necessárias do estudante."
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
    await insertStudent(req.body);
    // respostas:
    res.status(201).send({
      message: `Estudante ${name} registrado`,
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
}

export default createStudent;
