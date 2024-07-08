import { ITodo } from "../interfaces/ITodo";
import * as TodoModel from "../models/todos";

export const getTodos = () => {
  const data = TodoModel.getTodos();
  return data;
};

export const getTodoById = (id: string) => {
  const data = TodoModel.getTodoById(id);
  return data;
};

export const addTodo = (todo: ITodo) => {
  const data = TodoModel.addTodo(todo);

  return data;
};
