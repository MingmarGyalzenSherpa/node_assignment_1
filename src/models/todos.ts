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
      .select("id", "title", "completed", "created_at")
      .table("todos")
      .where({ created_by: userId })
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);

    if (q) {
      query.whereLike("title", `%${q}%`);
    }
    return await query;
  };

  /**
   * Get a todo by id
   *
   * @param todoId - id of todo
   * @param userId  - id of user
   * @returns {Promise<ITodo | undefined>} - corresponding todo or undefined
   */
  static getTodoById = async (
    todoId: string,
    userId: string
  ): Promise<ITodo | undefined> => {
    const todo = await this.queryBuilder()
      .select("id", "title", "completed", "created_at")
      .table("todos")
      .where({ id: todoId, created_by: userId })
      .first();

    return todo as ITodo;
  };

  /**
   * Get count of all todos
   *
   * @returns {Promise<number>} - count of all todo
   */
  static count = async (): Promise<number> => {
    const result = await this.queryBuilder().count("*").table("todos").first();
    return result.count;
  };

  /**
   * Add a todo
   *
   * @param todo - todo details
   * @returns
   */
  static addTodo = async (todo: ITodo) => {
    await this.queryBuilder().insert(todo).table("todos");
  };

  /**
   * Update a todo
   *
   * @param id  - id of the todo
   * @param updatedTodo - updated todo
   */
  static updateTodo = async (id: string, updatedTodo: ITodo) => {
    await this.queryBuilder().update(updatedTodo).table("todos").where({ id });
  };

  /**
   * Delete a todo
   * @param id - id of the todo
   */
  static deleteTodo = async (id: string) => {
    await this.queryBuilder().table("todos").where({ id: id }).del();
  };
}
