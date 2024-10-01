import express from "express";

import { AllTeachers } from '../teacher/controller/teacher.controller'

export default (router: express.Router) => {
    router.get("/teachers", AllTeachers);
}