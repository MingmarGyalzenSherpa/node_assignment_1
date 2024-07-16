"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
exports.config = {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiryMS: process.env.ACCESS_TOKEN_EXPIRY_MS,
        refreshTokenExpiryMS: process.env.REFRESH_TOKEN_EXPIRY_MS,
    },
    database: {
        client: process.env.DB_CLIENT,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};
//# sourceMappingURL=config.js.map