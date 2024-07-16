"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const TABLE_NAME = "role_permissions";
/**
 * Delete existing entries and seed values for table role_permissions.
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
                permission_id: 1,
                role_id: 1,
            },
            {
                permission_id: 2,
                role_id: 1,
            },
            {
                permission_id: 3,
                role_id: 1,
            },
            {
                permission_id: 4,
                role_id: 1,
            },
            {
                permission_id: 7,
                role_id: 1,
            },
            {
                permission_id: 5,
                role_id: 1,
            },
            {
                permission_id: 6,
                role_id: 1,
            },
            {
                permission_id: 8,
                role_id: 1,
            },
            {
                permission_id: 3,
                role_id: 2,
            },
            {
                permission_id: 4,
                role_id: 2,
            },
            {
                permission_id: 2,
                role_id: 2,
            },
            {
                permission_id: 1,
                role_id: 2,
            },
        ]);
    });
}
//# sourceMappingURL=03_role_permissions.js.map