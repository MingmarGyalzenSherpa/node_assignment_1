import joi from "joi";

export const getTodoQuerySchema = joi
  .object({
    name: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });
