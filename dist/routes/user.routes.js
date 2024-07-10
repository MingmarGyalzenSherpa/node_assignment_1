"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.use(auth_middleware_1.authentication);
//get all user
router.get("/", (0, auth_middleware_1.authorization)("user.get"), userController_1.getAllUsers);
//update user
router.put("/:id", (0, auth_middleware_1.authorization)("user.update"), userController_1.updateUser);
//create a user
router.post("/create", (0, auth_middleware_1.authorization)("user.create"), userController_1.createUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map