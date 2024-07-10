import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controller/todosController";
import { auth } from "../middlewares/auth.middleware";

const router = express();

//auth middleware
router.use(auth);

//routes
router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);
export default router;
