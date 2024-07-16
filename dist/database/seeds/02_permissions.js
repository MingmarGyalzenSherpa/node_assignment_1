"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const TABLE_NAME = "permissions";
/**
 * Delete existing entries and seed values for table permissions.
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
                permission_name: "todo.get",
            },
            {
                permission_name: "todo.create",
            },
            {
                permission_name: "todo.update",
            },
            {
                permission_name: "todo.delete",
            },
            {
                permission_name: "user.get",
            },
            {
                permission_name: "user.create",
            },
            {
                permission_name: "user.update",
            },
            {
                permission_name: "user.delete",
            },
        ]);
    });
}
//# sourceMappingURL=02_permissions.js.map