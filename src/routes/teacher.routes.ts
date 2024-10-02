import express from "express";
import { CreateTeacher } from "../teacher/controller/teacher.controller";



export default (router: express.Router) => {
    // router.get("/teacher/all", AllTeachers);
    router.post("/teacher/create", CreateTeacher);
}