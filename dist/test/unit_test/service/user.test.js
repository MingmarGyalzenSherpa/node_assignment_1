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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServices_1 = require("../../../services/userServices");
const expect_1 = __importDefault(require("expect"));
const user_1 = require("../../../models/user");
const sinon_1 = __importDefault(require("sinon"));
const messageGenerator = __importStar(require("../../../utils/messageGenerator"));
const BadRequestError_1 = require("../../../error/BadRequestError");
describe("User Service Test Suite", () => {
    //get all user test
    describe("getAllUsers", () => {
        let userModelGetAllUserStub;
        beforeEach(() => {
            userModelGetAllUserStub = sinon_1.default.stub(user_1.UserModel, "getUsers");
        });
        afterEach(() => {
            userModelGetAllUserStub.restore();
        });
        it("should return array of users", () => __awaiter(void 0, void 0, void 0, function* () {
            userModelGetAllUserStub.returns([]);
            const output = yield (0, userServices_1.getAllUsers)({});
            console.log(output);
            (0, expect_1.default)(output).toStrictEqual([]);
        }));
    });
    //create a new user test
    describe("createUser", () => {
        let userModelGetUserByEmailStub;
        let bcryptHashStub;
        const user = {
            email: "test@test.com",
            name: "test",
            password: "thisispassword",
        };
        beforeEach(() => {
            userModelGetUserByEmailStub = sinon_1.default.stub(user_1.UserModel, "getUserByEmail");
            bcryptHashStub = sinon_1.default.stub(bcrypt_1.default, "hash");
        });
        afterEach(() => {
            userModelGetUserByEmailStub.restore();
            bcryptHashStub.restore();
        });
        //successful user create
        it("should return a object with message 'User created successfully' on successful user creation", () => __awaiter(void 0, void 0, void 0, function* () {
            userModelGetUserByEmailStub.returns(undefined);
            bcryptHashStub.resolves("hashedPassword");
            const response = yield (0, userServices_1.createUser)(user);
            const expectedOutput = {
                message: "User created successfully",
            };
            (0, expect_1.default)(response).toStrictEqual(expectedOutput);
        }));
        //unsuccessful user create
        it("should throw bad request error on 'unsuccessful user create' ", () => __awaiter(void 0, void 0, void 0, function* () {
            userModelGetUserByEmailStub.returns(user);
            bcryptHashStub.resolves("hashedPassword");
            (0, expect_1.default)(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, userServices_1.createUser)(user); })).rejects.toThrowError(new BadRequestError_1.BadRequestError(messageGenerator.alreadyExists("User")));
        }));
    });
    //get user by email test
    describe("getUserByEmail", () => {
        let testEmail = "ming@ming.com";
        let user = {
            id: "1",
            name: "Mingma",
            email: testEmail,
            password: "password",
            roleName: "user" /* userRole.USER */,
        };
        let userModelGetUserByEmailStub;
        beforeEach(() => {
            userModelGetUserByEmailStub = sinon_1.default.stub(user_1.UserModel, "getUserByEmail");
        });
        afterEach(() => {
            userModelGetUserByEmailStub.restore();
        });
        it("should return user if user is found", () => __awaiter(void 0, void 0, void 0, function* () {
            userModelGetUserByEmailStub.returns(user);
            const response = yield (0, userServices_1.getUserByEmail)(testEmail);
            (0, expect_1.default)(response).toStrictEqual(user);
        }));
        it("should throw undefined user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userModelGetUserByEmailStub.returns(undefined);
            const response = yield (0, userServices_1.getUserByEmail)(testEmail);
            (0, expect_1.default)(response).toBe(undefined);
        }));
    });
});
//# sourceMappingURL=user.test.js.map