"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQuery = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getUserQuery = joi_1.default
    .object({
    name: joi_1.default.string().optional(),
})
    .options({
    stripUnknown: true,
});
//# sourceMappingURL=user.schema.js.map