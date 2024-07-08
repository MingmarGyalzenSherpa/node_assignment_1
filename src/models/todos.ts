import { ITodo } from "../interfaces/ITodo";

let todos = [
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

export const deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
  return todos;
};

export const updateTodo = (id: string, todo: ITodo) => {
  let todoToUpdate = todos.find(({ id: todoId }) => todoId === id);
  if (!todoToUpdate) {
    return {
      message: `Todo with id ${id} not found`,
    };
  }

  todoToUpdate = {
    ...todoToUpdate,
    ...todo,
  };

  todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];

  return todoToUpdate;
};
