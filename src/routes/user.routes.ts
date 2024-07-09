import express from "express";
import { createUser } from "../controller/userController";

const router = express();

router.post("/create", createUser);

export default router;
