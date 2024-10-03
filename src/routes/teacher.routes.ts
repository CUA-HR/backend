import express from "express";
import { AllTeachers, CreateTeacher, DeleteTeacher, Teacher, UpdateTeacher } from "../teacher/controller/teacher.controller";



export default (router: express.Router) => {
    router.post("/teacher/create", CreateTeacher);
    router.get("/teacher/all", AllTeachers);
    router.get("/teacher/:id", Teacher);
    router.put("/teacher/update", UpdateTeacher);
    router.delete("/teacher/delete/:id", DeleteTeacher);
}