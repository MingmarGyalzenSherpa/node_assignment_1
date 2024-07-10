import { updated } from "./../utils/messageGenerator";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { ITodo } from "../interfaces/ITodo";
import * as TodoModel from "../models/todos";
import * as messageGenerator from "../utils/messageGenerator";

/**
 * Get all todos by id
 *
 * @param {string} userId - id of the user
 * @returns {ITodo[]} todos - list of todos created by user
 */
export const getTodos = (userId: string): ITodo[] => {
  const data = TodoModel.getTodos(userId);

  if (!data) {
    throw new NotFoundError(messageGenerator.notFound("Todo"));
  }
  return data;
};

/**
 * Get a todo by id
 *
 * @param {string} id - id of todo
 * @returns {ITodo} todo - the matching todo
 */
export const getTodoById = (id: string, userId: string): ITodo => {
  const data = TodoModel.getTodoById(id, userId);
  if (!data) {
    throw new BadRequestError(messageGenerator.notFound("Todo"));
  }
  return data;
};

/**
 * Add a todo
 *
 * @param todo
 * @returns {todos}
 */
export const addTodo = (todo: ITodo): ITodo[] => {
  const data = TodoModel.addTodo(todo);

  return data;
};

/**
 *  Delete a todo by id
 *
 * @param {string} id - id of the todo
 * @returns {ITodo} - deleted todo
 */
export const deleteTodo = (id: string, userId: string): ITodo => {
  const data = TodoModel.deleteTodo(id, userId);
  
  return data;
};

/**
 * Update a todo by id
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
  const todoToUpdate = TodoModel.getTodoById(id, userId);

  if (!todoToUpdate) {
    throw new NotFoundError(messageGenerator.notFound("Todo"));
  }
  const data = TodoModel.updateTodo(todoToUpdate, updatedTodo);
  return data;
};
