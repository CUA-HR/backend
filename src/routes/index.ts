import express from "express";
import teacherRoutes from "./teacher.routes";

const router = express.Router();

export default (): express.Router => {
    teacherRoutes(router);
    return router
}