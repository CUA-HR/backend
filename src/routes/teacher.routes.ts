import express from "express";
import { AllTeachers, CreateTeacher, DeleteTeacher, ImportTeachersXlsx, Teacher, UpdateTeacher } from "../teacher/controller/teacher.controller";
import multer from "multer";

// Multer configuration for handling file uploads
import fs from "fs";
const uploadsDir = '../../uploads'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadsDir, { recursive: true });
        cb(null, uploadsDir);
    },
});

const upload = multer({ storage: storage });

export default (router: express.Router) => {
    // CRUD
    router.post("/teacher/create", CreateTeacher);
    router.get("/teacher/all", AllTeachers);
    router.get("/teacher/:id", Teacher);
    router.put("/teacher/update", UpdateTeacher);
    router.delete("/teacher/delete/:id", DeleteTeacher);

    // Import
    router.post("/teacher/import/xlsx", upload.single("file"), ImportTeachersXlsx);
}