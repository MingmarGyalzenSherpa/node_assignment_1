import joi from "joi";

export const getUserQuery = joi
  .object({
    q: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });
