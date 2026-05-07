const express = require("express");
const app = express.Router();

app.use("/user/auth", require('../modules/auth/router'));

module.exports = app;
