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
const supertest_1 = __importDefault(require("supertest"));
const messageGenerator = __importStar(require("../../utils/messageGenerator"));
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("../../routes/index.routes"));
const expect_1 = __importDefault(require("expect"));
describe("User Integration Test Suite", () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(index_routes_1.default);
    let accessToken;
    //get accesstoken
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        let userCredential = {
            email: "test@test.com",
            password: "test123",
        };
        const loginResponse = yield (0, supertest_1.default)(app)
            .post("/auth/login")
            .send(userCredential);
        accessToken = loginResponse.body.data[0].accessToken;
    }));
    describe("should create a new user", () => {
        let user = {
            name: "Gopal",
            email: "gopal@test.com",
            password: "Test@123",
        };
        it("Should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            let expectedOutput = {
                message: messageGenerator.created("User"),
            };
            const response = yield (0, supertest_1.default)(app)
                .post("/users/create")
                .set("Authorization", `Bearer ${accessToken}`)
                .send(user);
            console.log("here");
            console.log(response.body);
            (0, expect_1.default)(response.body).toStrictEqual(expectedOutput);
        }));
    });
});
//# sourceMappingURL=user.test.js.map