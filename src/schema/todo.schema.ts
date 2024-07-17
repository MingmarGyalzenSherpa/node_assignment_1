import joi from "joi";

export const getTodoQuerySchema = joi
  .object({
    q: joi.string().optional(),
    size: joi
      .number()
      .min(1)
      .max(10)
      .optional()
      .messages({
        "number.base": "Size must be a number",
        "number.min": "Size must be greater than or equal to 1",
        "number.max": "Size must be less than or equal to 10",
      })
      .default(1),
    page: joi.number().min(1).optional().messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be greater than or equal to 1",
      "number.max": "Page must be less than or equal to 10",
    }),
  })
  .default(1)
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

export const updateTodoBodySchema = joi
  .object({
    title: joi.string().optional(),
    completed: joi.boolean().optional(),
  })
  .options({
    stripUnknown: true,
  });
