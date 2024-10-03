import express from "express";
import { AllTiers, CreateTier, DeleteTier, Tier, UpdateTier } from "../tier/controller/tier.controller";



export default (router: express.Router) => {
    router.post("/tier/create", CreateTier);
    router.get("/tier/:id", Tier);
    router.get("/tier/all", AllTiers);
    router.put("/tier/update", UpdateTier);
    router.delete("/tier/delete/:id", DeleteTier);
}