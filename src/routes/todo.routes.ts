import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
} from "../controller/todosController";

const router = express();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

export default router;
