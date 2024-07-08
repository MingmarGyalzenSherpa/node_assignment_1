import { ITodo } from "../interfaces/ITodo";

const todos = [
  {
    id: "1",
    title: "Go home",
  },
  {
    id: "2",
    title: "Work",
  },
];

export const getTodos = () => todos;

export const getTodoById = (id: String) => {
  const data = todos.find(({ id: todoId }) => todoId === id);
  return data;
};

export const addTodo = (todo: ITodo) => {
  todos.push({
    id: `${todos.length + 1}`,
    ...todo,
  });

  return todos;
};
