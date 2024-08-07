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
const NotFoundError_1 = require("../error/NotFoundError");
const TodoModel = __importStar(require("../models/todos"));
const messageGenerator = __importStar(require("../utils/messageGenerator"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("Todo Services");
/**
 * Get all todos by id
 *
 * @param {string} userId - id of the user
 * @returns {Promise<{data:ITodo[],meta:{page:number,size:number,count:number}}>} - list of todos created by user
 */
const getTodos = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started getTodos service");
    const data = yield TodoModel.TodoModel.getTodos(userId, query);
    const count = yield TodoModel.TodoModel.count();
    const meta = {
        page: query.page,
        size: query.size,
        count: +count,
    };
    if (!data) {
        const message = messageGenerator.notFound("Todo");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    logger.info("Exiting get todos service");
    return {
        data,
        meta,
    };
});
exports.getTodos = getTodos;
/**
 * Get a todo by id
 *
 * @param {string} id - id of todo
 * @returns {Promise<ITodo | undefined>} - the matching todo
 */
const getTodoById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started getTodoById service");
    const data = yield TodoModel.TodoModel.getTodoById(id, userId);
    if (!data) {
        const message = messageGenerator.notFound("Todo");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    logger.info("Exiting getTodoById service");
    return data;
});
exports.getTodoById = getTodoById;
/**
 * Add a todo
 *
 * @param todo - new todo details
 * @returns
 */
const addTodo = (todo) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started addTodo service");
    const data = yield TodoModel.TodoModel.addTodo(todo);
    logger.info("Exiting addTodo service");
    return data;
});
exports.addTodo = addTodo;
/**
 *  Delete a todo by id
 *
 * @param {string} id - id of the todo
 * @returns {Promise<ITodo>}- deleted todo
 */
const deleteTodo = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started deleteTodo service");
    const todoToDelete = yield TodoModel.TodoModel.getTodoById(id, userId);
    if (!todoToDelete) {
        return;
    }
    yield TodoModel.TodoModel.deleteTodo(id);
    logger.info("Exiting deleteTodo service");
    return todoToDelete;
});
exports.deleteTodo = deleteTodo;
/**
 * Update a todo by id
 *
 * @param id - id of the todo
 * @param  userId - id of user
 * @param updatedTodo - updated field of todo
 * @returns
 */
const updateTodo = (id, userId, updatedTodo) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started updateTodo service");
    const todoToUpdate = yield TodoModel.TodoModel.getTodoById(id, userId);
    console.log(todoToUpdate);
    if (!todoToUpdate) {
        const message = messageGenerator.notFound("Todo");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    yield TodoModel.TodoModel.updateTodo(todoToUpdate.id, updatedTodo);
    logger.info("Exiting updateTodo service");
});
exports.updateTodo = updateTodo;
//# sourceMappingURL=todoServices.js.map