const joi = require("joi");

const taskCreateRequest = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is required.",
      "string.empty": "Title cannot be empty.",
      "string.base": "Title must be a string.",
    }),
    description: joi.string().required().messages({
      "any.required": "Description is required.",
      "string.empty": "Description cannot be empty.",
      "string.base": "Description must be a string.",
    }),
    completed: joi.boolean().allow(null).empty("").messages({
      "boolean.base": "Status must be boolean",
    }),
  })
  .options({ abortEarly: false });

module.exports = {
  taskCreateRequest,
};
