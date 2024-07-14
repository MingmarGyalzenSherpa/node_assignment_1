import joi from "joi";

export const getUserQuerySchema = joi
  .object({
    q: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });

export const createUserBodySchema = joi
  .object({
    name: joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Not a valid email",
    }),
    password: joi
      .string()
      .min(8)
      .required()
      .messages({
        "any.required": "Password is required",
        "string.min": "Password should be at least 8 characters",
        "password.uppercase": "Password must contain an uppercase",
        "password.lowercase": "Password must contain a lowercase",
        "password.number": "Password must contain a number",
      })
      .custom((value, helpers) => {
        // check uppercase
        if (!/[A-Z]/.test(value)) {
          return helpers.error("password.uppercase");
        }

        //check lower case
        if (!/[a-z]/.test(value)) {
          return helpers.error("password.lowercase");
        }

        //check number
        if (!/[0-9]/.test(value)) {
          return helpers.error("password.number");
        }
      }),
    role: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });

export const updateUserBodySchema = joi
  .object({
    name: joi.string().optional(),
    email: joi.string().optional(),
    role: joi.string().optional(),
    password: joi
      .string()
      .required()
      .min(8)
      .messages({
        "string.min": "Password should be at least 8 characters",
        "password.uppercase": "Password must contain an uppercase",
        "password.lowercase": "Password must contain a lowercase",
        "password.number": "Password must contain a number",
      })
      .custom((value, helpers) => {
        // check uppercase
        if (!/[A-Z]/.test(value)) {
          return helpers.error("password.uppercase");
        }

        //check lower case
        if (!/[a-z]/.test(value)) {
          return helpers.error("password.lowercase");
        }

        //check number
        if (!/[0-9]/.test(value)) {
          return helpers.error("password.number");
        }

        return value;
      }),
  })
  .options({
    stripUnknown: true,
  });
