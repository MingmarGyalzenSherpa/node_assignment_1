import { baseKnexConfig } from "../knexfile";
import knex, { Knex } from "knex";

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
};

export default knex(knexConfig);
