"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = exports.validateReqQuery = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const validateReqQuery = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.query);
    console.log(value);
    if (error) {
        next(new BadRequestError_1.BadRequestError(error.message));
    }
    req.query = value;
    next();
};
exports.validateReqQuery = validateReqQuery;
const validateReqBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    console.log(req.body);
    console.log(value);
    if (error) {
        next(new BadRequestError_1.BadRequestError(error.message));
    }
    req.body = value;
    next();
};
exports.validateReqBody = validateReqBody;
//# sourceMappingURL=validator.js.map