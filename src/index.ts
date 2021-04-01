import app from "./app";
import createStudent from "./endpoints/Student/createStudent";
import createTeacher from "./endpoints/Teacher/createTeacher";


// Cadastrar estudante
app.post("/student/create", createStudent);

// Cadastrar professor
app.post("/teacher/create", createTeacher);