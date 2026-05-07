const { request, response } = require("express");
const { default: status } = require("http-status");
const { hashPassword, assignJwt } = require("../service");
const UserModel = require("../../../schema/user");

const register = async (request, response) => {
  try {
    const { name, email, password } = request?.body;

    if (!name || !email || !password) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message: "name or email or passowrd fields are required",
      });
    }

    const data = {
      name,
      email,
      password: hashPassword(password),
    };

    const userData = await UserModel.create(data);
    const token = await assignJwt(userData?._id);

    return response.status(status.OK).json({
      success: true,
      message: "User created",
      token,
    });
  } catch (error) {
    throw Error("Error while register new user", error);
  }
};

module.exports = { register };
