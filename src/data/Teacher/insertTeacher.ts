import connection from "../../connection";
import { Teacher } from "../../types/teacher";


export const insertTeacher = async (teacher: Teacher): Promise<void> => {
  try {
    await connection
      .insert({
        id: Date.now(), //ou nada e fazer/mudar tab com id INT PRIMARY KEY AUTO_INCREMENT, que vai incrementando no sql de 2 em 2 int automaticamente.
        name: teacher.name,
        email: teacher.email,
        birthdate: teacher.birthdate,
      })
      .into("Teacher");
  } catch (error) {
    throw new Error(error.message || error.sqlMessage);
  }
};