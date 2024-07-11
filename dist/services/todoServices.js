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
const NotFoundError_1 = require("../error/NotFoundError");
const TodoModel = __importStar(require("../models/todos"));
const messageGenerator = __importStar(require("../utils/messageGenerator"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("Todo Services");
/**
 * Get all todos by id
 *
 * @param {string} userId - id of the user
 * @returns {ITodo[]} todos - list of todos created by user
 */
const getTodos = (userId) => {
    logger.info("Started getTodos service");
    const data = TodoModel.getTodos(userId);
    if (!data) {
        const message = messageGenerator.notFound("Todo");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    logger.info("Exiting get todos service");
    return data;
};
exports.getTodos = getTodos;
/**
 * Get a todo by id
 *
 * @param {string} id - id of todo
 * @returns {ITodo} todo - the matching todo
 */
const getTodoById = (id, userId) => {
    logger.info("Started getTodoById service");
    const data = TodoModel.getTodoById(id, userId);
    if (!data) {
        const message = messageGenerator.notFound("Todo");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    logger.info("Exiting getTodoById service");
    return data;
};
exports.getTodoById = getTodoById;
/**
 * Add a todo
 *
 * @param todo
 * @returns {todos}
 */
const addTodo = (todo) => {
    logger.info("Started addTodo service");
    const data = TodoModel.addTodo(todo);
    logger.info("Exiting addTodo service");
    return data;
};
exports.addTodo = addTodo;
/**
 *  Delete a todo by id
 *
 * @param {string} id - id of the todo
 * @returns {ITodo} - deleted todo
 */
const deleteTodo = (id, userId) => {
    logger.info("Started deleteTodo service");
    const data = TodoModel.deleteTodo(id, userId);
    logger.info("Exiting deleteTodo service");
    return data;
};
exports.deleteTodo = deleteTodo;
/**
 * Update a todo by id
 *
 * @param id - id of the todo
 * @param  userId - id of user
 * @param updatedTodo - updated field of todo
 * @returns {ITodo} - updated todo
 */
const updateTodo = (id, userId, updatedTodo) => {
    logger.info("Started updateTodo service");
    const todoToUpdate = TodoModel.getTodoById(id, userId);
    if (!todoToUpdate) {
        const message = messageGenerator.notFound("Todo");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    const data = TodoModel.updateTodo(todoToUpdate, updatedTodo);
    logger.info("Exiting updateTodo service");
    return data;
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todoServices.js.map