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
exports.deleteUserById = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const UserServices = __importStar(require("../services/userServices"));
const BadRequestError_1 = require("../error/BadRequestError");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const data = yield UserServices.createUser(body);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => {
    const { query } = req;
    const data = UserServices.getAllUsers(query);
    res.status(http_status_codes_1.default.OK).json({
        message: "User fetched successfully",
        data: data,
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => {
    try {
        const { id: userId } = req.params;
        const data = UserServices.getUserById(userId);
        res.status(http_status_codes_1.default.OK).json({
            message: "User fetched successfully",
            data: [data],
        });
    }
    catch (error) {
        throw new BadRequestError_1.BadRequestError(error.message);
    }
};
exports.getUserById = getUserById;
/**
 *  Update a user by id
 * @param req
 * @param res
 * @param next
 */
const updateUser = (req, res, next) => {
    try {
        const { id: userId } = req.params;
        console.log("insidde");
        const { body: updatedUser } = req;
        const user = UserServices.updateUser(userId, updatedUser);
        res.status(http_status_codes_1.default.OK).json({
            message: "User updated successfully",
            data: [user],
        });
    }
    catch (error) {
        console.log("error ayo");
        next(new BadRequestError_1.BadRequestError(error.message));
    }
};
exports.updateUser = updateUser;
/**
 * Delete a user by id
 * @param req
 * @param res
 * @param next
 */
const deleteUserById = (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const data = UserServices.deleteUserById(userId);
        res.status(http_status_codes_1.default.OK).json({
            message: "User deleted successfully",
            data: [data],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userController.js.map