"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const base_1 = require("./base");
class TodoModel extends base_1.BaseModel {
}
exports.TodoModel = TodoModel;
_a = TodoModel;
/**
 * Get all todos
 *
 * @param userId
 * @returns
 */
TodoModel.getTodos = (userId, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = filter;
    console.log(filter);
    const query = _a.queryBuilder()
        .select("id", "title", "completed", "created_at")
        .table("todos")
        .where({ created_by: userId })
        .limit(filter.size)
        .offset((filter.page - 1) * filter.size);
    if (q) {
        query.whereLike("title", `%${q}%`);
    }
    return yield query;
});
/**
 * Get a todo by id
 *
 * @param todoId - id of todo
 * @param userId  - id of user
 * @returns {Promise<ITodo | undefined>} - corresponding todo or undefined
 */
TodoModel.getTodoById = (todoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield _a.queryBuilder()
        .select("id", "title", "completed", "created_at")
        .table("todos")
        .where({ id: todoId, created_by: userId })
        .first();
    return todo;
});
/**
 * Get count of all todos
 *
 * @returns {Promise<number>} - count of all todo
 */
TodoModel.count = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield _a.queryBuilder().count("*").table("todos").first();
    return result.count;
});
/**
 * Add a todo
 *
 * @param todo - todo details
 * @returns
 */
TodoModel.addTodo = (todo) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.queryBuilder().insert(todo).table("todos");
});
/**
 * Update a todo
 *
 * @param id  - id of the todo
 * @param updatedTodo - updated todo
 */
TodoModel.updateTodo = (id, updatedTodo) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.queryBuilder().update(updatedTodo).table("todos").where({ id });
});
/**
 * Delete a todo
 * @param id - id of the todo
 */
TodoModel.deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.queryBuilder().table("todos").where({ id: id }).del();
});
//# sourceMappingURL=todos.js.map