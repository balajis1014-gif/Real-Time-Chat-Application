const mongoose = require("mongoose");
const options = { type: String, require: true };

const userSchema = new mongoose.Schema(
  {
    firstName: options,
    lastName: options,
    email: options,
    password: options,
  },
  { timestamps: true },
);

const UserModel = new mongoose.model("user", userSchema);
module.exports = UserModel;
