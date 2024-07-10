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
 * @param {string} userId - id of the user
 * @returns {ITodo} - corresponding todo of the user
 */
const getTodos = (userId) => {
    console.log(userId);
    return todos.filter(({ createdBy }) => createdBy === userId);
};
exports.getTodos = getTodos;
/**
 * Get a todo by id
 * @param {string} id
 * @returns {ITodo}
 */
const getTodoById = (id, userId) => {
    const data = todos.find(({ id: todoId, createdBy }) => todoId === id && createdBy === userId);
    return data;
};
exports.getTodoById = getTodoById;
/**
 * Add a todo
 * @param {ITodo} todo - details of the todo
 * @returns {ITodo[]} - new list of todos
 */
const addTodo = (todo) => {
    todos.push(Object.assign({ id: `${todos.length + 1}` }, todo));
    return todos;
};
exports.addTodo = addTodo;
/**
 * Delete a todo
 * @param id
 * @returns {ITodo} todo
 */
const deleteTodo = (id, userId) => {
    let todo = (0, exports.getTodoById)(id, userId);
    todos = todos.filter((todo) => todo.id !== id && todo.createdBy !== userId);
    return todo;
};
exports.deleteTodo = deleteTodo;
/**
 * Update a todo by id
 * @param id - id of the todo
 * @param todo - updated field of the todo
 * @returns {ITodo} todo - the updated todo
 */
const updateTodo = (id, userId, todo) => {
    let todoToUpdate = (0, exports.getTodoById)(id, userId);
    todoToUpdate = Object.assign(Object.assign({}, todoToUpdate), todo);
    todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];
    return todoToUpdate;
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todos.js.map