"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const TABLE_NAME = "roles";
/**
 * Delete existing entries and seed values for table roles.
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
                role_name: "superAdmin",
            },
            {
                role_name: "user",
            },
        ]);
    });
}
//# sourceMappingURL=01_roles.js.map