import express from "express";
import teacher from "./teacher.routes";
import position from "./position.routes"
import teacherHistory from "./teacherHistory.routes";
const router = express.Router();

export default (): express.Router => {
    teacher(router);
    position(router);
    teacherHistory(router);
    return router
}