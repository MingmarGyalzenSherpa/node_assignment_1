"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const permissions_1 = require("../constants/permissions");
const ForbiddenError_1 = require("../error/ForbiddenError");
const UnAuthorizedError_1 = require("../error/UnAuthorizedError");
/**
 * Middleware for authentication
 * @param req
 * @param res
 * @param next
 * @returns
 */
const authentication = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        next(new UnAuthorizedError_1.UnAuthorizedError("Unauthorized access"));
    }
    const token = authorization.split(" ");
    if (token.length != 2 || token[0] !== "Bearer") {
        next(new UnAuthorizedError_1.UnAuthorizedError("Unauthorized access"));
    }
    try {
        const user = (0, jsonwebtoken_1.verify)(token[1], config_1.config.jwt.secret);
        req.user = user;
    }
    catch (error) {
        next(new UnAuthorizedError_1.UnAuthorizedError("Unauthorized access"));
    }
    next();
};
exports.authentication = authentication;
const authorization = (permission) => (req, res, next) => {
    const user = req.user;
    const userRole = user.role;
    console.log(userRole);
    const userPermissions = permissions_1.permissions[userRole];
    if (!userPermissions.includes(permission)) {
        next(new ForbiddenError_1.ForbiddenError("Access denied"));
    }
    next();
};
exports.authorization = authorization;
//# sourceMappingURL=auth.middleware.js.map