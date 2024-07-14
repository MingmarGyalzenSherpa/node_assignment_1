import joi from "joi";

export const getTodoQuerySchema = joi
  .object({
    name: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });

export const createTodoBodySchema = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
    }),
    completed: joi.boolean().optional(),
  })
  .options({
    stripUnknown: true,
  });

