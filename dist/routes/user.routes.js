"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = (0, express_1.default)();
router.post("/create", userController_1.createUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map