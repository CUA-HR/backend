import express from "express";
import { AllTiers, CreateTier, DeleteTier, Tier, UpdateTier } from "../tier/controller/tier.controller";
import { verifyToken } from "../middlewares/auth.middleware";


export default (router: express.Router) => {
    router.post("/tier/create", verifyToken, CreateTier);
    router.get("/tier/all", verifyToken, AllTiers);
    router.get("/tier/:id", verifyToken, Tier);
    router.put("/tier/update", verifyToken, UpdateTier);
    router.delete("/tier/delete/:id", verifyToken, DeleteTier);
}