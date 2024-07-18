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
 * @returns {Promise<{data:ITodo[],meta:{page:number,size:number,count:number}}>} - list of todos created by user
 */
export const getTodos = async (
  userId: string,
  query: IGetRequestQuery
): Promise<{
  data: ITodo[];
  meta: { page: number; size: number; count: number };
}> => {
  logger.info("Started getTodos service");

  const data = await TodoModel.TodoModel.getTodos(userId, query);

  const count = await TodoModel.TodoModel.count();

  const meta = {
    page: query.page,
    size: query.size,
    count: +count,
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
 * @returns {Promise<ITodo | undefined>} - the matching todo
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
 * @param todo - new todo details
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
 * @returns {Promise<ITodo>}- deleted todo
 */
export const deleteTodo = async (
  id: string,
  userId: string
): Promise<ITodo> => {
  logger.info("Started deleteTodo service");

  const todoToDelete = await TodoModel.TodoModel.getTodoById(id, userId);

  if (!todoToDelete) {
    return;
  }
  await TodoModel.TodoModel.deleteTodo(id);

  logger.info("Exiting deleteTodo service");
  return todoToDelete as ITodo;
};

/**
 * Update a todo by id
 *
 * @param id - id of the todo
 * @param  userId - id of user
 * @param updatedTodo - updated field of todo
 * @returns
 */
export const updateTodo = async (
  id: string,
  userId: string,
  updatedTodo: ITodo
) => {
  logger.info("Started updateTodo service");

  const todoToUpdate = await TodoModel.TodoModel.getTodoById(id, userId);
  console.log(todoToUpdate);
  if (!todoToUpdate) {
    const message = messageGenerator.notFound("Todo");
    logger.error(message);
    throw new NotFoundError(message);
  }
  await TodoModel.TodoModel.updateTodo(todoToUpdate.id, updatedTodo);

  logger.info("Exiting updateTodo service");
};
