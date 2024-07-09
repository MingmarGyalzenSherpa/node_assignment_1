"use strict";
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
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = (0, userServices_1.getUserByEmail)(user.email);
    if (!existingUser) {
        return {
            message: "Invalid email or password",
        };
    }
    const isValidPassword = yield bcrypt_1.default.compare(user.password, existingUser.password);
    if (!isValidPassword) {
        return {
            message: "Invalid email or password",
        };
    }
    const payload = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
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
const refresh = (oldRefreshToken) => {
    if (!oldRefreshToken) {
        return {
            message: "Invalid",
        };
    }
    const isValidToken = (0, jsonwebtoken_1.verify)(oldRefreshToken, config_1.config.jwt.secret);
    if (!isValidToken) {
        return {
            message: "Invalid",
        };
    }
    const payload = {
        id: isValidToken.id,
        name: isValidToken.name,
        email: isValidToken.email,
    };
    const accessToken = (0, jsonwebtoken_1.sign)(payload, config_1.config.jwt.secret, {
        expiresIn: parseInt(config_1.config.jwt.accessTokenExpiryMS),
    });
    const newRefreshToken = (0, jsonwebtoken_1.sign)(payload, config_1.config.jwt.secret, {
        expiresIn: parseInt(config_1.config.jwt.refreshTokenExpiryMS),
    });
    return {
        accessToken,
        newRefreshToken,
    };
};
exports.refresh = refresh;
//# sourceMappingURL=authServices.js.map