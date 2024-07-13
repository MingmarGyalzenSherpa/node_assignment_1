import joi from "joi";

export const getTodoQuery = joi
  .object({
    name: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });
