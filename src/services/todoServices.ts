import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { ITodo } from "../interfaces/ITodo";
import * as TodoModel from "../models/todos";
import * as messageGenerator from "../utils/messageGenerator";
import loggerWithNameSpace from "../utils/logger";
import { IGetRequestQuery } from "../interfaces/IGetRequestQuery";

const logger = loggerWithNameSpace("Todo Services");

/**
 * Get all todos by id
 *
 * @param {string} userId - id of the user
 * @returns todos - list of todos created by user
 */
export const getTodos = async (userId: string, query: IGetRequestQuery) => {
  logger.info("Started getTodos service");

  const data = await TodoModel.TodoModel.getTodos(userId, query);

  const count = await TodoModel.TodoModel.count();

  const meta = {
    page: query.page,
    size: query.size,
    count: +count.count,
  };
  if (!data) {
    const message = messageGenerator.notFound("Todo");
    logger.error(message);
    throw new NotFoundError(message);
  }
  logger.info("Exiting get todos service");
  return {
    data,
    meta,
  };
};

/**
 * Get a todo by id
 *
 * @param {string} id - id of todo
 * @returns todo - the matching todo
 */
export const getTodoById = async (id: string, userId: string) => {
  logger.info("Started getTodoById service");

  const data = await TodoModel.TodoModel.getTodoById(id, userId);
  if (!data) {
    const message = messageGenerator.notFound("Todo");
    logger.error(message);
    throw new NotFoundError(message);
  }
  logger.info("Exiting getTodoById service");

  return data;
};

/**
 * Add a todo
 *
 * @param todo
 * @returns
 */
export const addTodo = async (todo: ITodo) => {
  logger.info("Started addTodo service");

  const data = await TodoModel.TodoModel.addTodo(todo);

  logger.info("Exiting addTodo service");
  return data;
};

/**
 *  Delete a todo by id
 *
 * @param {string} id - id of the todo
 * @returns {ITodo} - deleted todo
 */
export const deleteTodo = (id: string, userId: string): ITodo => {
  logger.info("Started deleteTodo service");
  const data = TodoModel.deleteTodo(id, userId);

  logger.info("Exiting deleteTodo service");
  return data;
};

/**
 * Update a todo by id
 *
 * @param id - id of the todo
 * @param  userId - id of user
 * @param updatedTodo - updated field of todo
 * @returns {ITodo} - updated todo
 */
export const updateTodo = (
  id: string,
  userId: string,
  updatedTodo: ITodo
): ITodo => {
  logger.info("Started updateTodo service");

  const todoToUpdate = TodoModel.getTodoById(id, userId);

  if (!todoToUpdate) {
    const message = messageGenerator.notFound("Todo");
    logger.error(message);
    throw new NotFoundError(message);
  }
  const data = TodoModel.updateTodo(todoToUpdate, updatedTodo);

  logger.info("Exiting updateTodo service");
  return data;
};
