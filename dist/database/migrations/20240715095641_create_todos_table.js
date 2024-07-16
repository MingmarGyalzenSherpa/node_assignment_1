"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const TABLE_NAME = "todos";
/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable(TABLE_NAME, (table) => {
            table.bigIncrements();
            table.string("title", 100).notNullable();
            table.boolean("completed").notNullable();
            table
                .bigInteger("created_by")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users");
            table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
        });
    });
}
/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(TABLE_NAME);
    });
}
//# sourceMappingURL=20240715095641_create_todos_table.js.map