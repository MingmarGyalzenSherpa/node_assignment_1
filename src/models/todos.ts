import { ITodo } from "../interfaces/ITodo";

let todos = [
  {
    id: "1",
    title: "Go home",
    completed: false,
  },
  {
    id: "2",
    title: "Work",
    completed: true,
  },
];

/**
 * Get all todos
 * @returns {todos}
 */
export const getTodos = (): ITodo[] => todos;

/**
 * Get a todo by id
 * @param {string} id
 * @returns {todo}
 */
export const getTodoById = (id: String) => {
  const data = todos.find(({ id: todoId }) => todoId === id);
  return data;
};

/**
 * Add a todo
 * @param todo
 * @returns {todos}
 */
export const addTodo = (todo: ITodo): ITodo[] => {
  todos.push({
    id: `${todos.length + 1}`,
    ...todo,
  });

  return todos;
};

/**
 * Delete a todo
 * @param id
 * @returns {todos}
 */
export const deleteTodo = (id: string): ITodo[] => {
  todos = todos.filter((todo) => todo.id !== id);
  return todos;
};

/**
 * Update a todo by id
 * @param id
 * @param todo
 * @returns {todo}
 */
export const updateTodo = (id: string, todo: ITodo): ITodo => {
  let todoToUpdate = getTodoById(id);

  todoToUpdate = {
    ...todoToUpdate,
    ...todo,
  };

  todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];

  return todoToUpdate;
};
