const express = require("express");
const userMiddleware = require("../validator/userMiddleware");
const app = express.Router();

app.use("/user/auth", require("../modules/auth/router"));

app.use("/user", userMiddleware, require("../modules/user/router"));

module.exports = app;
