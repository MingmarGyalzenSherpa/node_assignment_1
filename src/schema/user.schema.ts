import joi from "joi";

export const getUserQuery = joi
  .object({
    name: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });

  
