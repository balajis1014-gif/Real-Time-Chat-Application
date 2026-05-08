const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.object({
    countryCode: Joi.string().required(),
    nationalNumber: Joi.string().required(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema, verifyOtpSchema };
