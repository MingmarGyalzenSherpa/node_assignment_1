"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use(logger_middleware_1.requestLogger);
//route
app.use(index_routes_1.default);
//errorhandler middleware
app.use(errorHandler_middleware_1.notFound);
app.use(errorHandler_middleware_1.genericErrorHandler);
/**
 * Base route goes here
 */
app.get("/", (req, res) => {
    res.send("HELLO TO TODO CRUD");
});
/**
 * Start the server
 */
app.listen(config_1.config.port, () => {
    console.log(`Server listening on port : ${config_1.config.port}`);
});
//# sourceMappingURL=index.js.map