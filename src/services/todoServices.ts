import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { ITodo } from "../interfaces/ITodo";
import * as TodoModel from "../models/todos";
import * as messageGenerator from "../utils/messageGenerator";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Todo Services");

/**
 * Get all todos by id
 *
 * @param {string} userId - id of the user
 * @returns {ITodo[]} todos - list of todos created by user
 */
export const getTodos = (userId: string): ITodo[] => {
  logger.info("Started getTodos service");

  const data = TodoModel.getTodos(userId);

  if (!data) {
    const message = messageGenerator.notFound("Todo");
    logger.error(message);
    throw new NotFoundError(message);
  }
  logger.info("Exiting get todos service");
  return data;
};

/**
 * Get a todo by id
 *
 * @param {string} id - id of todo
 * @returns {ITodo} todo - the matching todo
 */
export const getTodoById = (id: string, userId: string): ITodo => {
  logger.info("Started getTodoById service");

  const data = TodoModel.getTodoById(id, userId);
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
 * @returns {todos}
 */
export const addTodo = (todo: ITodo): ITodo[] => {
  logger.info("Started addTodo service");

  const data = TodoModel.addTodo(todo);

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
