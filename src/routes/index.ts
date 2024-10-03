import express from "express";
import teacher from "./teacher.routes";
import position from "./position.routes"
const router = express.Router();

export default (): express.Router => {
    teacher(router);
    position(router);
    return router
}