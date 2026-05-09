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
  bio: Joi.string().optional(),
  gender: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().required(),
});

const updateSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  bio: Joi.string().optional(),
  phone: Joi.forbidden(),
  email: Joi.forbidden(),
  password: Joi.forbidden(),
  gender: Joi.string().optional(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  updateSchema,
  changePasswordSchema,
};
