const express = require("express");
const { validateRequest } = require("../../../validator/joiMiddleware");
const {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
} = require("../../../validator/userValidator");
const { register, loginWithOtp, verifyOtp } = require("../controller");
const app = express.Router();

app.post("/register", validateRequest(registerSchema), register);

app.post("/login", validateRequest(loginSchema), loginWithOtp);

app.post("/verify-otp", validateRequest(verifyOtpSchema), verifyOtp);

module.exports = app;
