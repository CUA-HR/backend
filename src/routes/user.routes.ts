import express from "express";
import { Login, Register } from "../user/controller/user.controller";



export default (router: express.Router) => {
    router.post("/user/login", Login);
    router.post("/user/register", Register);
}