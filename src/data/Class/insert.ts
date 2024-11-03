import connection from "../../connection";
import { Student } from "d:/1.Cursos/0.Programação/2.Origamid/1. ORIGAMID - Web Design Completo/bikcraft-web/types/student";


export const insertStudent = async (student: Student): Promise<void> => {
  try {
    await connection
      .insert({
        id: Date.now(), //ou nada e fazer/mudar tab com id INT PRIMARY KEY AUTO_INCREMENT, que vai incrementando no sql de 2 em 2 int automaticamente.
        name: student.name,
        email: student.email,
        birthdate: student.birthdate,
      })
      .into("Student");
  } catch (error) {
    throw new Error(error.message || error.sqlMessage);
  }
};