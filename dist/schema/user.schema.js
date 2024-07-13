"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserBodySchema = exports.getUserQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getUserQuerySchema = joi_1.default
    .object({
    q: joi_1.default.string().optional(),
})
    .options({
    stripUnknown: true,
});
exports.createUserBodySchema = joi_1.default
    .object({
    name: joi_1.default.string().required().messages({
        "any.required": "Name is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Not a valid email",
    }),
    password: joi_1.default
        .string()
        .min(8)
        .required()
        .messages({
        "any.required": "Password is required",
        "string.min": "Password should be at least 8 characters",
        "password.uppercase": "Password must contain an uppercase",
        "password.lowercase": "Password must contain a lowercase",
        "password.number": "Password must contain a number",
    })
        .custom((value, helpers) => {
        // check uppercase
        if (!/[A-Z]/.test(value)) {
            return helpers.error("password.uppercase");
        }
        //check lower case
        if (!/[a-z]/.test(value)) {
            return helpers.error("password.lowercase");
        }
        //check number
        if (!/[0-9]/.test(value)) {
            return helpers.error("password.number");
        }
    }),
    role: joi_1.default.string().optional(),
})
    .options({
    stripUnknown: true,
});
//# sourceMappingURL=user.schema.js.map