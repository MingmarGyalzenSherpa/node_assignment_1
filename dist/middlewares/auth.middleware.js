"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return {
            message: "Unauthenticated",
        };
    }
    const token = authorization.split(" ");
    if (token.length != 2 || token[0] != "Bearer") {
        return {
            message: "Unauthenticated",
        };
    }
    const isValidToken = (0, jsonwebtoken_1.verify)(token[1], config_1.config.jwt.secret);
    if (!isValidToken) {
        next(new Error("Unauthenticated"));
    }
    const payload = isValidToken;
    req.headers.userId = payload.id;
    next();
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map