"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const db_1 = __importDefault(require("../utils/db"));
class BaseModel {
}
exports.BaseModel = BaseModel;
_a = BaseModel;
BaseModel.connection = db_1.default;
BaseModel.queryBuilder = () => _a.connection;
//# sourceMappingURL=base.js.map