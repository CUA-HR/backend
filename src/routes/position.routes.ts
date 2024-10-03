import express from "express";
import { AllPositions, CreatePosition, DeletePosition, Position, UpdatePosition } from "../position/controller/position.controller";



export default (router: express.Router) => {
    router.post("/position/create", CreatePosition);
    router.get("/position/:id", Position);
    router.get("/position/all", AllPositions);
    router.put("/position/update", UpdatePosition);
    router.delete("/position/delete/:id", DeletePosition);
}