"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoBodySchema = exports.createTodoBodySchema = exports.getTodoQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getTodoQuerySchema = joi_1.default
    .object({
    q: joi_1.default.string().optional(),
    size: joi_1.default
        .number()
        .min(1)
        .max(10)
        .optional()
        .messages({
        "number.base": "Size must be a number",
        "number.min": "Size must be greater than or equal to 1",
        "number.max": "Size must be less than or equal to 10",
    })
        .default(1),
    page: joi_1.default.number().min(1).optional().messages({
        "number.base": "Page must be a number",
        "number.min": "Page must be greater than or equal to 1",
        "number.max": "Page must be less than or equal to 10",
    }),
})
    .default(1)
    .options({
    stripUnknown: true,
});
exports.createTodoBodySchema = joi_1.default
    .object({
    title: joi_1.default.string().required().messages({
        "any.required": "Title is required",
    }),
    completed: joi_1.default.boolean().optional(),
})
    .options({
    stripUnknown: true,
});
exports.updateTodoBodySchema = joi_1.default
    .object({
    title: joi_1.default.string().optional(),
    completed: joi_1.default.boolean().optional(),
})
    .options({
    stripUnknown: true,
});
//# sourceMappingURL=todo.schema.js.map