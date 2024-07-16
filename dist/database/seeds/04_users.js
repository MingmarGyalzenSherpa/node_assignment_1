"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const TABLE_NAME = "users";
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
                name: "test",
                email: "test@test.com",
                password: "test1234",
                role_id: 1,
            },
            {
                name: "test2",
                email: "test2@test.com",
                password: "test1234",
                role_id: 2,
            },
        ]);
    });
}
//# sourceMappingURL=04_users.js.map