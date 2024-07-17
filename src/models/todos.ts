import { IGetRequestQuery } from "../interfaces/IGetRequestQuery";
import { ITodo } from "./../interfaces/ITodo";
import { BaseModel } from "./base";

export class TodoModel extends BaseModel {
  /**
   * Get all todos
   *
   * @param userId
   * @returns
   */
  static getTodos = async (userId: string, filter: IGetRequestQuery) => {
    const { q } = filter;
    console.log(filter);
    const query = this.queryBuilder()
      .select("title", "completed", "created_at")
      .table("todos")
      .where({ created_by: userId })
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);

    if (q) {
      query.whereLike("title", `%${q}%`);
    }
    return await query;
  };

  static getTodoById = async (todoId: string, userId: string) => {
    const todo = await this.queryBuilder()
      .select("title", "completed", "created_at")
      .table("todos")
      .where({ id: todoId, created_by: userId });
    console.log(todo);
    return todo as ITodo[];
  };

  static count = async () => {
    const count = await this.queryBuilder().count("*").table("todos").first();
    return count;
  };

  static addTodo = async (todo: ITodo) => {
    return await this.queryBuilder().insert(todo).table("todos");
  };

  static updateTodo = async (id: string, updatedTodo: ITodo) => {};
}

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
