import { ITodo } from "../interfaces/ITodo";
import * as TodoModel from "../models/todos";

/**
 * get all todos
 * @returns {todo}
 */
export const getTodos = (): ITodo[] => {
  const data = TodoModel.getTodos();
  return data;
};

/**
 * get a todo by id
 * @param id
 * @returns {todo}
 */
export const getTodoById = (id: string): ITodo => {
  const data = TodoModel.getTodoById(id);
  return data;
};

/**
 * add a todo
 * @param todo
 * @returns {todos}
 */
export const addTodo = (todo: ITodo): ITodo[] => {
  const data = TodoModel.addTodo(todo);

  return data;
};

/**
 *  delete a todo by id
 * @param id
 * @returns {todos}
 */
export const deleteTodo = (id: string): ITodo[] => {
  const data = TodoModel.deleteTodo(id);

  return data;
};

/**
 * Update a todo by id
 * @param id
 * @param todo
 * @returns {todo}
 */
export const updateTodo = (id: string, todo: ITodo): ITodo => {
  const data = TodoModel.updateTodo(id, todo);
  return data;
};
