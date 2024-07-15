"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const baseKnexConfig = {
    client: config_1.config.database.client,
    connection: {
        host: config_1.config.database.host,
        port: +config_1.config.database.port,
        user: config_1.config.database.user,
        password: config_1.config.database.password,
        database: config_1.config.database.name,
    },
};
const knexConfig = Object.assign(Object.assign({}, baseKnexConfig), { migrations: {
        directory: "./database/migrations",
        tableName: "migrations",
        extension: "ts",
        stub: "./stubs/migration.stub",
    } });
exports.default = knexConfig;
//# sourceMappingURL=knexfile.js.map