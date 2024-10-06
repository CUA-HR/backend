import express from "express";
import { AllTeachers, CreateTeacher, DeleteTeacher, ImportTeachersXlsx, Teacher, UpdateTeacher } from "../teacher/controller/teacher.controller";



export default (router: express.Router) => {
    // CRUD
    router.post("/teacher/create", CreateTeacher);
    router.get("/teacher/all", AllTeachers);
    router.get("/teacher/:id", Teacher);
    router.put("/teacher/update", UpdateTeacher);
    router.delete("/teacher/delete/:id", DeleteTeacher);
    // Import
    router.post("/teacher/import/xlsx", ImportTeachersXlsx);
}