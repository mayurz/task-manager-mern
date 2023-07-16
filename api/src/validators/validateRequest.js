const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    //return res.send(error);
    if (error) {
      const errorMap = [];

      error.details.forEach((err) => {
        const { path, message } = err;

        errorMap.push({
          field: path[0],
          message,
        });
      });

      return res.status(400).json({
        code: 400,
        message: "Validation failed",
        errors: errorMap,
      });
    }

    next();
  };
};

module.exports = validateRequest;
