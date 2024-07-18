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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const ForbiddenError_1 = require("../error/ForbiddenError");
const UnAuthorizedError_1 = require("../error/UnAuthorizedError");
const role_1 = require("../models/role");
const rolePermission_1 = require("../models/rolePermission");
/**
 * Middleware for authentication
 *
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
/**
 * Authorization middleware
 *
 * @param permission - permission needed
 * @returns
 */
const authorization = (permission) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userRole = yield role_1.RoleModel.getRoleByName(user.roleName);
    //get all corresponding permissions
    const userPermissions = yield rolePermission_1.RolePermissionsModel.getAllPermissionsByRoleId(userRole.id);
    console.log(userPermissions);
    if (!userPermissions.find((permissions) => (permissions.permissionName = permission))) {
        next(new ForbiddenError_1.ForbiddenError("Access denied"));
    }
    console.log(userPermissions.find((permissions) => {
        console.log(permissions.permissionName);
        return permissions.permissionName === permission;
    }));
    next();
});
exports.authorization = authorization;
//# sourceMappingURL=auth.middleware.js.map