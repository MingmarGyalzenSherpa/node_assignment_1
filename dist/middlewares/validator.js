"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqQuery = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const validateReqQuery = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.query);
    if (error) {
        next(new BadRequestError_1.BadRequestError(error.message));
    }
    req.query = value;
    next();
};
exports.validateReqQuery = validateReqQuery;
//# sourceMappingURL=validator.js.map