"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodoById = exports.getTodos = void 0;
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
const getTodos = () => todos;
exports.getTodos = getTodos;
const getTodoById = (id) => {
    const data = todos.find(({ id: todoId }) => todoId === id);
    return data;
};
exports.getTodoById = getTodoById;
const addTodo = (todo) => {
    todos.push(Object.assign({ id: `${todos.length + 1}` }, todo));
    return todos;
};
exports.addTodo = addTodo;
const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    return todos;
};
exports.deleteTodo = deleteTodo;
const updateTodo = (id, todo) => {
    let todoToUpdate = (0, exports.getTodoById)(id);
    if (!todoToUpdate) {
        return {
            message: `Todo with id ${id} not found`,
        };
    }
    todoToUpdate = Object.assign(Object.assign({}, todoToUpdate), todo);
    todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];
    return todoToUpdate;
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todos.js.map