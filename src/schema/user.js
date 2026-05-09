const mongoose = require("mongoose");
const options = { type: String, require: true };

const userSchema = new mongoose.Schema(
  {
    firstName: options,
    lastName: options,
    email: options,
    password: options,
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
      require: true,
    },
    phone: {
      countryCode: options,
      nationalNumber: options,
    },
    bio: String,
    gender: options,
  },
  { timestamps: true },
);

const UserModel = new mongoose.model("user", userSchema);
module.exports = UserModel;
