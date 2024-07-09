"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodoById = exports.getTodos = void 0;
let todos = [
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
 * @returns {todos}
 */
const getTodos = () => todos;
exports.getTodos = getTodos;
/**
 * get a todo by id
 * @param {string} id
 * @returns {todo}
 */
const getTodoById = (id) => {
    const data = todos.find(({ id: todoId }) => todoId === id);
    return data;
};
exports.getTodoById = getTodoById;
/**
 * add a todo
 * @param todo
 * @returns {todos}
 */
const addTodo = (todo) => {
    todos.push(Object.assign({ id: `${todos.length + 1}` }, todo));
    return todos;
};
exports.addTodo = addTodo;
/**
 * Delete a todo
 * @param id
 * @returns {todos}
 */
const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    return todos;
};
exports.deleteTodo = deleteTodo;
/**
 * update a todo by id
 * @param id
 * @param todo
 * @returns {todo}
 */
const updateTodo = (id, todo) => {
    let todoToUpdate = (0, exports.getTodoById)(id);
    todoToUpdate = Object.assign(Object.assign({}, todoToUpdate), todo);
    todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];
    return todoToUpdate;
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todos.js.map