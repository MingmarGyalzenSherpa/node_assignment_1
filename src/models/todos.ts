import { ITodo } from "./../interfaces/ITodo";

let todos: ITodo[] = [
  {
    id: "1",
    title: "Go home",
    completed: false,
    createdBy: "1",
  },
  {
    id: "2",
    title: "Go shopping",
    completed: false,
    createdBy: "1",
  },
  {
    id: "3",
    title: "Work",
    completed: true,
    createdBy: "2",
  },
];

/**
 * Get all todos
 *
 * @param {string} userId - id of the user
 * @returns {ITodo} - corresponding todos of the user
 */
export const getTodos = (userId: string): ITodo[] =>
  todos.filter(({ createdBy }) => createdBy === userId);

/**
 * Get a todo by id
 *
 * @param {string} id - id of the todo
 * @returns {ITodo | undefined} - corresponding user or undefined if todo doesn't exist
 */
export const getTodoById = (id: String, userId: string): ITodo | undefined => {
  const data = todos.find(
    ({ id: todoId, createdBy }) => todoId === id && createdBy === userId
  );
  return data;
};

/**
 * Add a todo
 *
 * @param {ITodo} todo - details of the todo
 * @returns {ITodo[]} - new list of todos
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
 *
 * @param id
 * @returns {ITodo} todo
 */
export const deleteTodo = (id: string, userId: string): ITodo => {
  let todo = getTodoById(id, userId);
  todos = todos.filter((todo) => todo.id !== id && todo.createdBy !== userId);
  return todo;
};

/**
 * Update a todo by id
 *
 * @param todoToUpdate - old todo
 * @param updatedTodo  - new todo fields
 * @returns {ITodo} - updated todo
 */
export const updateTodo = (todoToUpdate: ITodo, updatedTodo: ITodo): ITodo => {
  todoToUpdate = {
    ...todoToUpdate,
    ...updatedTodo,
  };

  todos = [
    ...todos.filter(({ id: todoId }) => todoId != todoToUpdate.id),
    todoToUpdate,
  ];

  return todoToUpdate;
};
