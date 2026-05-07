const express = require("express");
const { validateRequest } = require("../../../validator/joiMiddleware");
const { registerSchema } = require("../../../validator/userValidator");
const { register } = require("../controller");
const app = express.Router();

app.post("/register", validateRequest(registerSchema), register);

module.exports = app;
