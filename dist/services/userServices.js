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
exports.deleteUserById = exports.updateUser = exports.getUserById = exports.getUserByEmail = exports.getAllUsers = exports.createUser = void 0;
const NotFoundError_1 = require("../error/NotFoundError");
const UserModel = __importStar(require("../models/user"));
const messageGenerator = __importStar(require("../utils/messageGenerator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const BadRequestError_1 = require("../error/BadRequestError");
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("User Services");
/**
 * Create a new user
 *
 * @param {IUser} user - new user field
 * @returns {Promise<object>} - message object
 */
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started createUser service");
    const existingUser = UserModel.getUserByEmail(user.email);
    if (existingUser) {
        const message = messageGenerator.alreadyExists("User");
        logger.error(message);
        throw new BadRequestError_1.BadRequestError(message);
    }
    if (!user.role) {
        user.role = "user" /* userRole.USER */;
    }
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    UserModel.createUser(Object.assign(Object.assign({}, user), { password: hashedPassword }));
    logger.info("Exiting createUser service");
    return {
        message: messageGenerator.created("User"),
    };
});
exports.createUser = createUser;
/**
 * Get all users
 *
 * @returns {IUser[]}
 */
const getAllUsers = (query) => {
    logger.info("Started getAllUsers service");
    logger.info("Exiting getAllUsers service");
    return UserModel.getAllUsers(query);
};
exports.getAllUsers = getAllUsers;
/**
 * Get a user by email
 *
 * @param {string} email - email of the user
 * @returns {IUser | undefined} - user or undefined if doesn't exist
 */
const getUserByEmail = (email) => {
    logger.info("Started getUserByEmail service");
    const data = UserModel.getUserByEmail(email);
    logger.info("Exiting getUserByEmail service");
    return data;
};
exports.getUserByEmail = getUserByEmail;
/**
 * Get a user by id
 *
 * @param id
 * @returns {IUser | undefined} - user or undefined if doesn't exist
 */
const getUserById = (id) => {
    logger.info("Started getUserById service");
    const data = UserModel.getUserById(id);
    if (!data) {
        const message = messageGenerator.notFound("User");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    logger.info("Exiting getUserById service");
    return data;
};
exports.getUserById = getUserById;
/**
 *  Update a user by id
 *
 * @param {string} id - id of user
 * @param {IUser} updatedUser - new field of user
 * @returns {Promise<IUser>} - user
 */
const updateUser = (id, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Started updateUser service");
    const userExists = UserModel.getUserById(id);
    if (!userExists) {
        const message = messageGenerator.notFound("User");
        logger.error(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    console.log(updatedUser);
    if (updatedUser.password) {
        updatedUser.password = yield bcrypt_1.default.hash(updatedUser.password, 10);
    }
    console.log(updatedUser.password);
    const data = UserModel.updateUser(id, updatedUser);
    logger.info("Exiting updateUser service");
    return data;
});
exports.updateUser = updateUser;
/**
 * Delete a user by id
 *
 * @param id - user id
 * @returns {IUser} - deleted user
 */
const deleteUserById = (id) => {
    logger.info("started deleteUser service");
    const userExists = UserModel.getUserById(id);
    if (!userExists) {
        const message = messageGenerator.notFound("User");
        logger.info(message);
        throw new NotFoundError_1.NotFoundError(message);
    }
    const data = UserModel.deleteUserById(id);
    logger.info("Exiting deleteUser service");
    return data;
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userServices.js.map