import express from "express";
import { AllDurations, CreateDuration, DeleteDuration, Duration, UpdateDuration } from "../duration/controller/duration.controller";



export default (router: express.Router) => {
    router.post("/duration/create", CreateDuration);
    router.get("/duration/all", AllDurations);
    router.get("/duration/:id", Duration);
    router.put("/duration/update", UpdateDuration);
    router.delete("/duration/delete/:id", DeleteDuration);
}