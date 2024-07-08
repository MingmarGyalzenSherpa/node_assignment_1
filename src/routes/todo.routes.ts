import express from "express";
import { getTodos } from "../controller/todosController";

const router = express();

router.get("/", getTodos);

export default router;
