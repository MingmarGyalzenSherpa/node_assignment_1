"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodoById = exports.getTodos = void 0;
const TodoServices = __importStar(require("../services/todoServices"));
const responseObject_1 = __importDefault(require("../utils/responseObject"));
const httpResponseStatus_1 = require("../constants/httpResponseStatus");
const getTodos = (req, res) => {
    const data = TodoServices.getTodos();
    res.status(httpResponseStatus_1.httpResponseStatus.OK).json(data);
};
exports.getTodos = getTodos;
const getTodoById = (req, res) => {
    const { id } = req.params;
    const data = TodoServices.getTodoById(id);
    if (!data) {
        res
            .status(httpResponseStatus_1.httpResponseStatus.NOT_FOUND)
            .json(new responseObject_1.default(`User with id ${id} not found!`, []));
    }
    res.status(200).json(new responseObject_1.default("User found successfully!", [data]));
};
exports.getTodoById = getTodoById;
const addTodo = (req, res) => {
    const todo = req.body;
    if (!todo || !(todo === null || todo === void 0 ? void 0 : todo.title)) {
        res.status(httpResponseStatus_1.httpResponseStatus.BAD_REQUEST).json({
            message: "Todo not found",
        });
        return;
    }
    if (todo.completed === undefined) {
        todo.completed = false;
    }
    const data = TodoServices.addTodo(todo);
    res.status(httpResponseStatus_1.httpResponseStatus.CREATED).json({
        message: "User added successfully",
        data,
    });
};
exports.addTodo = addTodo;
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const data = TodoServices.deleteTodo(id);
    res.status(httpResponseStatus_1.httpResponseStatus.OK).json({
        message: "User deleted successfully",
        data,
    });
};
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    const data = TodoServices.updateTodo(id, todo);
    res.status(httpResponseStatus_1.httpResponseStatus.OK).json({
        message: "User updated successfully!",
        data,
    });
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todosController.js.map