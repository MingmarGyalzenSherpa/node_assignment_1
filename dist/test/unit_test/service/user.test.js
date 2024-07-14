"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userServices_1 = require("../../../services/userServices");
const expect_1 = __importDefault(require("expect"));
const UserModel = __importStar(require("../../../models/user"));
const sinon_1 = __importDefault(require("sinon"));
describe("User Service Test Suite", () => {
    //get all user test
    describe("getAllUsers", () => {
        let userModelGetAllUserStub;
        beforeEach(() => {
            userModelGetAllUserStub = sinon_1.default.stub(UserModel, "getAllUsers");
        });
        afterEach(() => {
            userModelGetAllUserStub.restore();
        });
        it("should return array of users", () => {
            userModelGetAllUserStub.returns([]);
            const output = (0, userServices_1.getAllUsers)({});
            console.log(output);
            (0, expect_1.default)(output).toStrictEqual([]);
        });
    });
    //create a new user test
});
//# sourceMappingURL=user.test.js.map