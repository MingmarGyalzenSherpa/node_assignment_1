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
exports.refresh = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServices_1 = require("./userServices");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const NotFoundError_1 = require("../error/NotFoundError");
const messageGenerator = __importStar(require("../utils/messageGenerator"));
const UnAuthorizedError_1 = require("../error/UnAuthorizedError");
/**
 * Login a user
 *
 * @param user
 * @returns {Promise<object>} - accessToken and refreshToken
 */
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = (0, userServices_1.getUserByEmail)(user.email);
    if (!existingUser) {
        throw new NotFoundError_1.NotFoundError(messageGenerator.invalid("email or password"));
    }
    const isValidPassword = yield bcrypt_1.default.compare(user.password, existingUser.password);
    if (!isValidPassword) {
        throw new NotFoundError_1.NotFoundError(messageGenerator.invalid("email or password"));
    }
    const payload = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
    };
    const accessToken = (0, jsonwebtoken_1.sign)(payload, config_1.config.jwt.secret, {
        expiresIn: parseInt(config_1.config.jwt.accessTokenExpiryMS),
    });
    const refreshToken = (0, jsonwebtoken_1.sign)(payload, config_1.config.jwt.secret, {
        expiresIn: parseInt(config_1.config.jwt.refreshTokenExpiryMS),
    });
    return {
        accessToken,
        refreshToken,
    };
});
exports.login = login;
/**
 * Refresh access token
 *
 * @param {string} refreshToken - refresh token
 * @returns {object} - new access token
 */
const refresh = (refreshToken) => {
    if (!refreshToken) {
        throw new NotFoundError_1.NotFoundError(messageGenerator.notFound("Refresh Token"));
    }
    const isValidToken = (0, jsonwebtoken_1.verify)(refreshToken, config_1.config.jwt.secret);
    if (!isValidToken) {
        throw new UnAuthorizedError_1.UnAuthorizedError(messageGenerator.invalid("Refresh Token"));
    }
    const payload = {
        id: isValidToken.id,
        name: isValidToken.name,
        email: isValidToken.email,
    };
    const accessToken = (0, jsonwebtoken_1.sign)(payload, config_1.config.jwt.secret, {
        expiresIn: parseInt(config_1.config.jwt.accessTokenExpiryMS),
    });
    return {
        accessToken,
    };
};
exports.refresh = refresh;
//# sourceMappingURL=authServices.js.map