import express from "express";
import {
    AllTeachersHistories,
    CreateTeacherHistory,
    DeleteTeacherHistory,
    TeacherHistories,
    TeacherHistory,
    UpdateTeacherHistory,
    TeacherLastHistory,
} from "../teacherHistory/controller/teacherHistory.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
    router.post("/teacherHistory/create", verifyToken, CreateTeacherHistory);
    router.get("/teacherHistory/all", verifyToken, AllTeachersHistories);
    router.get("/teacherHistory/:teacherId", verifyToken, TeacherHistories);
    router.get("/teacherHistory/last/:teacherId", verifyToken,TeacherLastHistory);
    router.get("/teacherHistory/:id/teacher/:teacherId", verifyToken, TeacherHistory);
    router.put("/teacherHistory/update", verifyToken, UpdateTeacherHistory);
    router.delete("/teacherHistory/delete/:id/teacher/:teacherId", verifyToken, DeleteTeacherHistory);
}