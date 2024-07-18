import { IGetRequestQuery } from "./../interfaces/IGetRequestQuery";
import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import * as TodoServices from "../services/todoServices";
import ResponseObject from "../utils/responseObject";
import { httpResponseStatus } from "../constants/httpResponseStatus";
import * as message from "../utils/messageGenerator";
import HttpStatusCodes from "http-status-codes";
import { ITodo } from "../interfaces/ITodo";
/**
 * Get all todos
 * @param {Request} req
 * @param {Response} res
 *
 */
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const { id: userId } = req.user;
    const result = await TodoServices.getTodos(userId as string, query);

    res
      .status(HttpStatusCodes.OK)
      .json(
        new ResponseObject<any>(
          message.fetched("Todo"),
          result.data,
          result.meta
        )
      );
  } catch (error) {
    next(error);
  }
};

/**
 * Get todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const data = await TodoServices.getTodoById(id, userId as string);

    res
      .status(HttpStatusCodes.OK)
      .json(new ResponseObject<ITodo>(message.fetched("Todo"), [data]));
  } catch (error) {
    next(error);
  }
};

/**
 * Add a todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todo = req.body;
  const { id: userId } = req.user;
  if (!todo || !todo?.title) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ResponseObject<ITodo>(message.notFound("Todo"), []));
    return;
  }
  if (todo.completed === undefined) {
    todo.completed = false;
  }

  todo.createdBy = userId;

  const data = await TodoServices.addTodo(todo);
  res
    .status(HttpStatusCodes.CREATED)
    .json(new ResponseObject<ITodo>(message.created("Todo"), []));
};

/**
 * Delete a todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const data = await TodoServices.deleteTodo(id, userId as string);

  res
    .status(HttpStatusCodes.OK)
    .json(new ResponseObject<ITodo>(message.deleted("Todo"), [data]));
};

/**
 * Update todo
 * @param {Request} req
 * @param {Response} res
 *
 */
export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const todo = req.body;
    const data = TodoServices.updateTodo(id, userId as string, todo);

    res
      .status(HttpStatusCodes.OK)
      .json(new ResponseObject(message.updated("Todo"), [data]));
  } catch (error) {
    next(error);
  }
};
