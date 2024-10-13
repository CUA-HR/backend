import express from "express";
import { AllDurations, CreateDuration, DeleteDuration, Duration, UpdateDuration } from "../duration/controller/duration.controller";
import { verifyToken } from "../middlewares/auth.middleware";



export default (router: express.Router) => {
    router.post("/duration/create", verifyToken, CreateDuration);
    router.get("/duration/all", verifyToken, AllDurations);
    router.get("/duration/:id", verifyToken, Duration);
    router.put("/duration/update", verifyToken, UpdateDuration);
    router.delete("/duration/delete/:id", verifyToken, DeleteDuration);
}