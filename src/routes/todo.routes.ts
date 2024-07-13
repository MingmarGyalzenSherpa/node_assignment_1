import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controller/todosController";
import { authentication, authorization } from "../middlewares/auth.middleware";
import { validateReqQuery } from "../middlewares/validator";
import { getTodoQuery } from "../schema/todo.schema";

const router = express();

//auth middleware
router.use(authentication);

//routes

//get all todos
router.get(
  "/",
  authorization("todo.get"),
  validateReqQuery(getTodoQuery),
  getTodos
);

//get a todo by id
router.get("/:id", authorization("todo.get"), getTodoById);

//create a todo
router.post("/", authorization("todo.create"), addTodo);

//delete a todo
router.delete("/:id", authorization("todo.delete"), deleteTodo);

//update a todo
router.put("/:id", authorization("todo.update"), updateTodo);

export default router;
