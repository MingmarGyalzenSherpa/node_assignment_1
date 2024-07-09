import express from "express";
import { login } from "../controller/authController";

const router = express();

router.post("/login", login);

export default router;
