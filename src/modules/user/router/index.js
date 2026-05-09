const express = require("express");
const { detail, updateProfile, changePassword } = require("../controller");
const { validateRequest } = require("../../../validator/joiMiddleware");
const {
  updateSchema,
  changePasswordSchema,
} = require("../../../validator/userValidator");
const app = express.Router();

app.get("/", detail);

app.patch("/update-profile", validateRequest(updateSchema), updateProfile);

app.patch(
  "/change-password",
  validateRequest(changePasswordSchema),
  changePassword,
);

module.exports = app;
