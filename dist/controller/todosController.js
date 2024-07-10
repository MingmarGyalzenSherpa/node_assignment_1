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
const message = __importStar(require("../utils/messageGenerator"));
/**
 * Get all todos
 * @param {Request} req
 * @param {Response} res
 *
 */
const getTodos = (req, res) => {
    const { id: userId } = req.user;
    const data = TodoServices.getTodos(userId);
    res.status(httpResponseStatus_1.httpResponseStatus.OK).json(data);
};
exports.getTodos = getTodos;
/**
 * Get todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
const getTodoById = (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const data = TodoServices.getTodoById(id, userId);
    if (!data) {
        res
            .status(httpResponseStatus_1.httpResponseStatus.NOT_FOUND)
            .json(new responseObject_1.default(message.notFound("Todo"), []));
    }
    res
        .status(httpResponseStatus_1.httpResponseStatus.OK)
        .json(new responseObject_1.default(message.found("Todo"), [data]));
};
exports.getTodoById = getTodoById;
/**
 * Add a todo
 * @param {Request} req
 * @param {Response} res
 *
 */
const addTodo = (req, res) => {
    const todo = req.body;
    const { id: userId } = req.user;
    if (!todo || !(todo === null || todo === void 0 ? void 0 : todo.title)) {
        res
            .status(httpResponseStatus_1.httpResponseStatus.BAD_REQUEST)
            .json(new responseObject_1.default(message.notFound("Todo"), []));
        return;
    }
    if (todo.completed === undefined) {
        todo.completed = false;
    }
    todo.createdBy = userId;
    const data = TodoServices.addTodo(todo);
    res
        .status(httpResponseStatus_1.httpResponseStatus.CREATED)
        .json(new responseObject_1.default(message.created("Todo"), data));
};
exports.addTodo = addTodo;
/**
 * Delete a todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const data = TodoServices.deleteTodo(id, userId);
    res
        .status(httpResponseStatus_1.httpResponseStatus.OK)
        .json(new responseObject_1.default(message.deleted("Todo"), [data]));
};
exports.deleteTodo = deleteTodo;
/**
 * Update todo
 * @param {Request} req
 * @param {Response} res
 *
 */
const updateTodo = (req, res) => {
    console.log("here");
    const { id } = req.params;
    const { id: userId } = req.user;
    if (!TodoServices.getTodoById(id, userId)) {
        res
            .status(httpResponseStatus_1.httpResponseStatus.NOT_FOUND)
            .json(new responseObject_1.default(message.notFound("Todo"), []));
    }
    const todo = req.body;
    const data = TodoServices.updateTodo(id, userId, todo);
    res
        .status(httpResponseStatus_1.httpResponseStatus.OK)
        .json(new responseObject_1.default(message.updated("Todo"), [data]));
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todosController.js.map