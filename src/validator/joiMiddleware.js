const { default: status } = require("http-status");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const requestPayload = req.body;

    const { error } = schema.validate(requestPayload);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(". ");
      return res.status(status.BAD_REQUEST).json({ error: errorMessage });
    }
    next();
  };
};

module.exports = { validateRequest };
