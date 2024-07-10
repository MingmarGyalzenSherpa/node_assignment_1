import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import * as TodoServices from "../services/todoServices";
import ResponseObject from "../utils/responseObject";
import { httpResponseStatus } from "../constants/httpResponseStatus";
import * as message from "../utils/messageGenerator";
import HttpStatusCodes from "http-status-codes";
/**
 * Get all todos
 * @param {Request} req
 * @param {Response} res
 *
 */
export const getTodos = (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const data = TodoServices.getTodos(userId as string);

  res.status(HttpStatusCodes.OK).json(data);
};

/**
 * Get todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const data = TodoServices.getTodoById(id, userId as string);
  if (!data) {
    res
      .status(HttpStatusCodes.NOT_FOUND)
      .json(new ResponseObject(message.notFound("Todo"), []));
  }

  res
    .status(HttpStatusCodes.OK)
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
  const { id: userId } = req.user;
  if (!todo || !todo?.title) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ResponseObject(message.notFound("Todo"), []));
    return;
  }
  if (todo.completed === undefined) {
    todo.completed = false;
  }

  todo.createdBy = userId;

  const data = TodoServices.addTodo(todo);
  res
    .status(HttpStatusCodes.CREATED)
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
  const { id: userId } = req.user;
  const data = TodoServices.deleteTodo(id, userId as string);

  res
    .status(HttpStatusCodes.OK)
    .json(new ResponseObject(message.deleted("Todo"), [data]));
};

/**
 * Update todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  console.log("here");
  const { id } = req.params;
  const { id: userId } = req.user;
  if (!TodoServices.getTodoById(id, userId as string)) {
    res
      .status(HttpStatusCodes.NOT_FOUND)
      .json(new ResponseObject(message.notFound("Todo"), []));
  }
  const todo = req.body;
  const data = TodoServices.updateTodo(id, userId as string, todo);

  res
    .status(HttpStatusCodes.OK)
    .json(new ResponseObject(message.updated("Todo"), [data]));
};
