const joi = require("joi");

const loginRequest = joi
  .object({
    email: joi.string().required().email().messages({
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Email must be a valid email address.",
      "string.base": "Email must be a string.",
    }),
    password: joi.string().required().min(6).messages({
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.base": "Password must be a string.",
    }),
  })
  .options({ abortEarly: false });

module.exports = loginRequest;
