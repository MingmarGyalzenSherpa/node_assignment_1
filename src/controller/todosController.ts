import { Request, Response } from "express";
import * as TodoServices from "../services/todoServices";
import ResponseObject from "../utils/responseObject";
import { httpResponseStatus } from "../constants/httpResponseStatus";
import * as message from "../utils/messageGenerator";

/**
 * Get all todos
 * @param {Request} req
 * @param {Response} res
 *
 */
export const getTodos = (req: Request, res: Response) => {
  const data = TodoServices.getTodos();

  res.status(httpResponseStatus.OK).json(data);
};

/**
 * Get todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.getTodoById(id);

  if (!data) {
    res
      .status(httpResponseStatus.NOT_FOUND)
      .json(new ResponseObject(message.notFound("Todo"), []));
  }

  res
    .status(httpResponseStatus.OK)
    .json(new ResponseObject(message.found("Todo"), [data!]));
};

/**
 * Add a todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const addTodo = (req: Request, res: Response) => {
  const todo = req.body;

  if (!todo || !todo?.title) {
    res
      .status(httpResponseStatus.BAD_REQUEST)
      .json(new ResponseObject(message.notFound("Todo"), []));
    return;
  }
  if (todo.completed === undefined) {
    todo.completed = false;
  }

  const data = TodoServices.addTodo(todo);
  res
    .status(httpResponseStatus.CREATED)
    .json(new ResponseObject(message.created("Todo"), data));
};

/**
 * Delete a todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.deleteTodo(id);

  res
    .status(httpResponseStatus.OK)
    .json(new ResponseObject(message.deleted("Todo"), data));
};

/**
 * Update todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!TodoServices.getTodoById(id)) {
    res
      .status(httpResponseStatus.NOT_FOUND)
      .json(new ResponseObject(message.notFound("Todo"), []));
  }
  const todo = req.body;
  const data = TodoServices.updateTodo(id, todo);

  res
    .status(httpResponseStatus.OK)
    .json(new ResponseObject(message.updated("Todo"), [data]));
};
