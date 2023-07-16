const joi = require("joi");

const userCreateRequest = joi
  .object({
    name: joi.string().required().messages({
      "any.required": "Name is required.",
      "string.empty": "Name cannot be empty.",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Email must be a valid email address.",
    }),
    password: joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least {#limit} characters long.",
    }),
    address: joi.string().allow(null).empty(""),
  })
  .options({ abortEarly: false });

module.exports = userCreateRequest;
