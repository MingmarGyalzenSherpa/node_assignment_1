import { Knex } from "knex";

const TABLE_NAME = "table_name";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
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
