import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controller/todosController";
import { authenticate, authorization } from "../middlewares/auth.middleware";

const router = express();

//auth middleware
router.use(authenticate);
//routes
router.get("/", authorization("todo.gets"), getTodos);

router.get("/:id", getTodoById);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);
export default router;
