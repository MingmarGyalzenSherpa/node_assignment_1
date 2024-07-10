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
    title: "Work",
    completed: true,
    createdBy: "2",
  },
];

/**
 * Get all todos
 * @param {string} userId - id of the user
 * @returns {ITodo} - corresponding todo of the user
 */
export const getTodos = (userId: string): ITodo[] => {
  console.log(userId);
  return todos.filter(({ createdBy }) => createdBy === userId);
};

/**
 * Get a todo by id
 * @param {string} id
 * @returns {ITodo}
 */
export const getTodoById = (id: String): ITodo => {
  const data = todos.find(({ id: todoId }) => todoId === id);
  return data;
};

/**
 * Add a todo
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
 * @param id
 * @returns {ITodo} todo
 */
export const deleteTodo = (id: string): ITodo => {
  let todo = getTodoById(id);
  todos = todos.filter((todo) => todo.id !== id);
  return todo;
};

/**
 * Update a todo by id
 * @param id - id of the todo
 * @param todo - updated field of the todo
 * @returns {ITodo} todo - the updated todo
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
