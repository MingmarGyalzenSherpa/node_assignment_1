import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controller/todosController";
import { authentication, authorization } from "../middlewares/auth.middleware";

const router = express();

//auth middleware
router.use(authentication);
//routes
router.get("/", authorization("todo.get"), getTodos);

router.get("/:id", authorization("todo.get"), getTodoById);

router.post("/", authorization("todo.create"), addTodo);

router.delete("/:id", authorization("todo.delete"), deleteTodo);

router.put("/:id", authorization("todo.update"), updateTodo);
export default router;
