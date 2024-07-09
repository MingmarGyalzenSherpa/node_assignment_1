"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const router = (0, express_1.default)();
router.post("/login", authController_1.login);
router.post("/refresh", authController_1.refresh);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map