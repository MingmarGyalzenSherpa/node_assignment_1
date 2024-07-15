import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("name", 100).notNullable();

    table.string("email", 100).notNullable();

    table.string("password", 100).notNullable();

    table.bigInteger("role_id").references("id").inTable("roles");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
