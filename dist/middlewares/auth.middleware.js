"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authenticate = void 0;
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
const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        next(new UnAuthorizedError_1.UnAuthorizedError("Unauthorized access"));
    }
    const token = authorization.split(" ");
    if (token.length != 2 || token[0] != "Bearer") {
        next(new UnAuthorizedError_1.UnAuthorizedError("Unauthorized access"));
    }
    const user = (0, jsonwebtoken_1.verify)(token[1], config_1.config.jwt.secret);
    if (!user) {
        next(new UnAuthorizedError_1.UnAuthorizedError("Unauthorized access"));
    }
    req.user = user;
    next();
};
exports.authenticate = authenticate;
const authorization = (permission) => (req, res, next) => {
    const user = req.user;
    const userRole = user.role;
    const userPermissions = permissions_1.permissions[userRole];
    console.log(permissions_1.permissions[userRole]);
    console.log(permission);
    if (!userPermissions.includes(permission)) {
        next(new ForbiddenError_1.ForbiddenError("Access denied"));
    }
    next();
};
exports.authorization = authorization;
//# sourceMappingURL=auth.middleware.js.map