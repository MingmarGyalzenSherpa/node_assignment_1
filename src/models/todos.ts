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
