"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const TABLE_NAME = "table_name";
/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
function seed(knex) {
    return knex(TABLE_NAME)
        .del()
        .then(() => {
        return knex(TABLE_NAME).insert([
            {
                title: "Go shopping",
                created_by: 2,
                completed: false,
            },
            {
                title: "Go jog",
                created_by: 2,
                completed: true,
            },
            {
                title: "Shop groceries",
                created_by: 2,
                completed: false,
            },
            {
                title: "Go shopping",
                created_by: 1,
                completed: false,
            },
        ]);
    });
}
//# sourceMappingURL=05_todos.js.map