import { ITodo } from "../interfaces/ITodo";
import * as TodoModel from "../models/todos";

/**
 * Get all todos by id
 * @param {string} userId - id of the user
 * @returns {ITodo[]} todos - list of todos created by user
 */
export const getTodos = (userId: string): ITodo[] => {
  const data = TodoModel.getTodos(userId);
  return data;
};

/**
 * Get a todo by id
 * @param {string} id - id of todo
 * @returns {ITodo} todo - the matching todo
 */
export const getTodoById = (id: string): ITodo => {
  const data = TodoModel.getTodoById(id);
  return data;
};

/**
 * Add a todo
 * @param todo
 * @returns {todos}
 */
export const addTodo = (todo: ITodo): ITodo[] => {
  const data = TodoModel.addTodo(todo);

  return data;
};

/**
 *  Delete a todo by id
 * @param {string} id - id of the todo
 * @returns {ITodo} - deleted todo
 */
export const deleteTodo = (id: string): ITodo => {
  const data = TodoModel.deleteTodo(id);

  return data;
};

/**
 * Update a todo by id
 * @param id - id of the todo
 * @param todo - updated field of todo
 * @returns {ITodo} - updated todo
 */
export const updateTodo = (id: string, todo: ITodo): ITodo => {
  const data = TodoModel.updateTodo(id, todo);
  return data;
};
