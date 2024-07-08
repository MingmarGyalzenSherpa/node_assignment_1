"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
//route
app.use(index_routes_1.default);
app.listen(config_1.config.port, () => {
    console.log(`Server listening on port : ${config_1.config.port}`);
});
//# sourceMappingURL=index.js.map