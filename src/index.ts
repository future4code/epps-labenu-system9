import app from "./app";
import createClass from "./endpoints/Class/createClass";
import createStudent from "./endpoints/Student/createStudent";
import createTeacher from "./endpoints/Teacher/createTeacher";


// Cadastrar estudante
app.post("/student/create", createStudent);

// Cadastrar professor
app.post("/teacher/create", createTeacher);

// Cadastrar turma
app.post("/class/create", createClass);