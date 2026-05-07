const mongoose = require("mongoose");
const options = { type: String, require: true };

const userSchema = new mongoose.Schema(
  {
    name: options,
    email: options,
    password: options,
  },
  { timestamps: true },
);

const UserModel = new mongoose.model("user", userSchema);
module.exports = UserModel;
