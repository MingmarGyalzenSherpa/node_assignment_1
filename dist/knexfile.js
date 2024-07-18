"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseKnexConfig = void 0;
const config_1 = require("./config");
exports.baseKnexConfig = {
    client: config_1.config.database.client,
    connection: {
        host: config_1.config.database.host,
        port: +config_1.config.database.port,
        user: config_1.config.database.user,
        password: config_1.config.database.password,
        database: config_1.config.database.name,
    },
};
const knexConfig = Object.assign(Object.assign({}, exports.baseKnexConfig), { migrations: {
        directory: "./database/migrations",
        tableName: "migrations",
        extension: "ts",
        stub: "./stubs/migration.stub",
    }, seeds: {
        directory: "./database/seeds",
        extension: "ts",
        stub: "./stubs/seed.stub",
    } });
exports.default = knexConfig;
//# sourceMappingURL=knexfile.js.map