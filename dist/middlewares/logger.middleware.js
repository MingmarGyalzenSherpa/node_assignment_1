"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("RequestLogger");
function requestLogger(req, res, next) {
    logger.info(`${req.method}:${req.url}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map