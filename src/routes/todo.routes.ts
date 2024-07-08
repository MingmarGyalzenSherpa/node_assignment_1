import express from "express";
import { addTodo, getTodoById, getTodos } from "../controller/todosController";

const router = express();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/", addTodo);

export default router;
