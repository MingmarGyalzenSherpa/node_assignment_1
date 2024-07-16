"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.notFound = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const UnAuthorizedError_1 = require("../error/UnAuthorizedError");
const ForbiddenError_1 = require("../error/ForbiddenError");
const BadRequestError_1 = require("../error/BadRequestError");
const NotFoundError_1 = require("../error/NotFoundError");
const notFound = (req, res) => {
    res.status(http_status_codes_1.default.NOT_FOUND).json({
        message: "NOT FOUND",
    });
};
exports.notFound = notFound;
const genericErrorHandler = (err, req, res, next) => {
    //unauthorized error
    console.log(err);
    if (err instanceof UnAuthorizedError_1.UnAuthorizedError) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            message: err.message,
        });
    }
    //forbidden error
    if (err instanceof ForbiddenError_1.ForbiddenError) {
        return res.status(http_status_codes_1.default.FORBIDDEN).json({
            message: err.message,
        });
    }
    //Bad request error
    if (err instanceof BadRequestError_1.BadRequestError) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            message: err.message,
        });
    }
    if (err instanceof NotFoundError_1.NotFoundError) {
        return res.status(http_status_codes_1.default.NOT_FOUND).json({
            message: err.message,
        });
    }
    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
    });
};
exports.genericErrorHandler = genericErrorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map