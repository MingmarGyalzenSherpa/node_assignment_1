import toSnakeCase from "to-snake-case";
import { baseKnexConfig } from "../knexfile";
import knex, { Knex } from "knex";
import camelize from "camelize";

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  wrapIdentifier: (value, origImpl) => {
    if (value === "*") {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    return camelize(result);
  },
};

export default knex(knexConfig);
