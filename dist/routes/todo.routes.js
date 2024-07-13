"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosController_1 = require("../controller/todosController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_1 = require("../middlewares/validator");
const todo_schema_1 = require("../schema/todo.schema");
const router = (0, express_1.default)();
//auth middleware
router.use(auth_middleware_1.authentication);
//routes
//get all todos
router.get("/", (0, auth_middleware_1.authorization)("todo.get"), (0, validator_1.validateReqQuery)(todo_schema_1.getTodoQuery), todosController_1.getTodos);
//get a todo by id
router.get("/:id", (0, auth_middleware_1.authorization)("todo.get"), todosController_1.getTodoById);
//create a todo
router.post("/", (0, auth_middleware_1.authorization)("todo.create"), todosController_1.addTodo);
//delete a todo
router.delete("/:id", (0, auth_middleware_1.authorization)("todo.delete"), todosController_1.deleteTodo);
//update a todo
router.put("/:id", (0, auth_middleware_1.authorization)("todo.update"), todosController_1.updateTodo);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map