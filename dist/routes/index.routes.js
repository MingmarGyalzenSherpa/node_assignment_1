"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_routes_1 = __importDefault(require("./todo.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.use("/todos", todo_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map