import express from "express";
import { AllTeachersHistories, CreateTeacherHistory, DeleteTeacherHistory, TeacherHistories, TeacherHistory, UpdateTeacherHistory } from "../teacherHistory/controller/teacherHistory.controller";



export default (router: express.Router) => {
    router.post("/teacherHistory/create", CreateTeacherHistory);
    router.get("/teacherHistory/all", AllTeachersHistories);
    router.get("/teacherHistory/:teacherId", TeacherHistories);
    router.get("/teacherHistory/:id/teacher/:teacherId", TeacherHistory);
    router.put("/teacherHistory/update", UpdateTeacherHistory);
    router.delete("/teacherHistory/delete/:id/teacher/:teacherId", DeleteTeacherHistory);
}