import { Request, Response } from "express";
import * as TodoServices from "../services/todoServices";
import ResponseObject from "../utils/responseObject";
import { httpResponseStatus } from "../constants/httpResponseStatus";

export const getTodos = (req: Request, res: Response) => {
  const data = TodoServices.getTodos();

  res.status(httpResponseStatus.OK).json(data);
};

export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.getTodoById(id);

  if (!data) {
    res
      .status(httpResponseStatus.NOT_FOUND)
      .json(new ResponseObject(`User with id ${id} not found!`, []));
  }

  res.status(200).json(new ResponseObject("User found successfully!", [data!]));
};

export const addTodo = (req: Request, res: Response) => {
  const todo = req.body;

  if (!todo || !todo?.title) {
    res.status(httpResponseStatus.BAD_REQUEST).json({
      message: "Todo not found",
    });
    return;
  }
  if (todo.completed === undefined) {
    todo.completed = false;
  }

  const data = TodoServices.addTodo(todo);

  res.status(httpResponseStatus.CREATED).json({
    message: "User added successfully",
    data,
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.deleteTodo(id);

  res.status(httpResponseStatus.OK).json({
    message: "User deleted successfully",
    data,
  });
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = req.body;
  const data = TodoServices.updateTodo(id, todo);

  res.status(httpResponseStatus.OK).json({
    message: "User updated successfully!",
    data,
  });
};
