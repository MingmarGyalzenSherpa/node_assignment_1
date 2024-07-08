import * as TodoModel from "../models/todos";

export const getTodos = () => {
  const data = TodoModel.getTodos();
  return data;
};
