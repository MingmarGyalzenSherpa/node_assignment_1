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
exports.updateUser = exports.getUserByEmail = exports.getAllUsers = exports.createUser = void 0;
const UserModel = __importStar(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Create a new user
 * @param {IUser} user - new user field
 * @returns {Promise<object>} - message object
 */
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user.name && user.email && user.password)) {
        return {
            message: "Email or password missing",
        };
    }
    const existingUser = UserModel.getUserByEmail(user.email);
    if (existingUser) {
        return {
            message: "User already exists!",
        };
    }
    if (!user.role) {
        user.role = "user" /* userRole.USER */;
    }
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    UserModel.createUser(Object.assign(Object.assign({}, user), { password: hashedPassword }));
    return {
        message: "User created successfully",
    };
});
exports.createUser = createUser;
/**
 * Get all users
 * @returns {IUser[]}
 */
const getAllUsers = () => UserModel.getAllUsers();
exports.getAllUsers = getAllUsers;
/**
 * Get a user by email
 * @param {string} email - email of the user
 * @returns {IUser} - user
 */
const getUserByEmail = (email) => {
    const data = UserModel.getUserByEmail(email);
    return data;
};
exports.getUserByEmail = getUserByEmail;
/**
 *  Update a user by id
 * @param {string} id - id of user
 * @param {IUser} updatedUser - new field of user
 * @returns {IUser} - user
 */
const updateUser = (id, updatedUser) => {
    const userExists = UserModel.getUserById(id);
    if (!userExists) {
        throw new Error("User doesn't exist");
    }
    const data = UserModel.updateUser(id, updatedUser);
    return data;
};
exports.updateUser = updateUser;
//# sourceMappingURL=userServices.js.map