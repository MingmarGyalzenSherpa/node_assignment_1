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
  const { userId } = req.headers;
  const data = TodoServices.getTodos(userId as string);

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
  const { userId } = req.headers;
  const data = TodoServices.getTodoById(id, userId as string);
  if (!data) {
    res
      .status(httpResponseStatus.NOT_FOUND)
      .json(new ResponseObject(message.notFound("Todo"), []));
  }

  res.status(200).json(new ResponseObject(message.found("Todo"), [data!]));
};

/**
 * Add todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const addTodo = (req: Request, res: Response) => {
  const todo = req.body;
  const { userId } = req.headers;
  if (!todo || !todo?.title) {
    res
      .status(httpResponseStatus.BAD_REQUEST)
      .json(new ResponseObject(message.notFound("Todo"), []));
    return;
  }
  if (todo.completed === undefined) {
    todo.completed = false;
  }

  todo.createdBy = userId;

  const data = TodoServices.addTodo(todo);
  res
    .status(httpResponseStatus.CREATED)
    .json(new ResponseObject(message.created("Todo"), data));
};

/**
 * Delete todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.headers;
  const data = TodoServices.deleteTodo(id, userId as string);

  res
    .status(httpResponseStatus.OK)
    .json(new ResponseObject(message.deleted("Todo"), [data]));
};

/**
 * Update todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const updateTodo = (req: Request, res: Response) => {
  console.log("here");
  const { id } = req.params;
  const { userId } = req.headers;
  if (!TodoServices.getTodoById(id, userId as string)) {
    res
      .status(httpResponseStatus.NOT_FOUND)
      .json(new ResponseObject(message.notFound("Todo"), []));
  }
  const todo = req.body;
  const data = TodoServices.updateTodo(id, userId as string, todo);

  res
    .status(httpResponseStatus.OK)
    .json(new ResponseObject(message.updated("Todo"), [data]));
};
