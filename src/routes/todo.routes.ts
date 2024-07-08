import express from "express";
import { getTodoById, getTodos } from "../controller/todosController";

const router = express();

router.get("/", getTodos);

router.get("/:id", getTodoById);

export default router;
