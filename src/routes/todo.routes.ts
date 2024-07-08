import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controller/todosController";

const router = express();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);
export default router;
