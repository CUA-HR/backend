import express from "express";
import teacher from "./teacher.routes";
import position from "./position.routes"
import teacherHistory from "./teacherHistory.routes";
import tier from "./tier.routes"
import duration from "./duration.routes";
const router = express.Router();

export default (): express.Router => {

    teacher(router);
    teacherHistory(router);
    position(router);
    tier(router);
    duration(router);

    return router
}