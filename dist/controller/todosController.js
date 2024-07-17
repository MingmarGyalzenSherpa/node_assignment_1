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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodoById = exports.getTodos = void 0;
const TodoServices = __importStar(require("../services/todoServices"));
const responseObject_1 = __importDefault(require("../utils/responseObject"));
const message = __importStar(require("../utils/messageGenerator"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
/**
 * Get all todos
 * @param {Request} req
 * @param {Response} res
 *
 */
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const { id: userId } = req.user;
        const result = yield TodoServices.getTodos(userId, query);
        res
            .status(http_status_codes_1.default.OK)
            .json(new responseObject_1.default(message.fetched("Todo"), result.data, result.meta));
    }
    catch (error) {
        next(error);
    }
});
exports.getTodos = getTodos;
/**
 * Get todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
const getTodoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const data = yield TodoServices.getTodoById(id, userId);
        res
            .status(http_status_codes_1.default.OK)
            .json(new responseObject_1.default(message.fetched("Todo"), data));
    }
    catch (error) {
        next(error);
    }
});
exports.getTodoById = getTodoById;
/**
 * Add a todo
 * @param {Request} req
 * @param {Response} res
 *
 */
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = req.body;
    const { id: userId } = req.user;
    if (!todo || !(todo === null || todo === void 0 ? void 0 : todo.title)) {
        res
            .status(http_status_codes_1.default.BAD_REQUEST)
            .json(new responseObject_1.default(message.notFound("Todo"), []));
        return;
    }
    if (todo.completed === undefined) {
        todo.completed = false;
    }
    todo.createdBy = userId;
    const data = yield TodoServices.addTodo(todo);
    res
        .status(http_status_codes_1.default.CREATED)
        .json(new responseObject_1.default(message.created("Todo"), []));
});
exports.addTodo = addTodo;
/**
 * Delete a todo by id
 * @param {Request} req
 * @param {Response} res
 *
 */
const deleteTodo = (req, res, next) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const data = TodoServices.deleteTodo(id, userId);
    res
        .status(http_status_codes_1.default.OK)
        .json(new responseObject_1.default(message.deleted("Todo"), [data]));
};
exports.deleteTodo = deleteTodo;
/**
 * Update todo
 * @param {Request} req
 * @param {Response} res
 *
 */
const updateTodo = (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const todo = req.body;
        const data = TodoServices.updateTodo(id, userId, todo);
        res
            .status(http_status_codes_1.default.OK)
            .json(new responseObject_1.default(message.updated("Todo"), [data]));
    }
    catch (error) {
        next(error);
    }
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todosController.js.map