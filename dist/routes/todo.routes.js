"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosController_1 = require("../controller/todosController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.get("/", auth_middleware_1.auth, todosController_1.getTodos);
router.get("/:id", todosController_1.getTodoById);
router.post("/", todosController_1.addTodo);
router.delete("/:id", todosController_1.deleteTodo);
router.put("/:id", todosController_1.updateTodo);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map