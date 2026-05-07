const { request, response } = require("express");
const { default: status } = require("http-status");
const { hashPassword, assignJwt } = require("../service");
const UserModel = require("../../../schema/user");

const register = async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request?.body;

    if (!firstName || !lastName || !email || !password) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message:
          "firstName or lastName or email or passowrd fields are required",
      });
    }

    const data = {
      firstName,
      lastName,
      email,
      password: hashPassword(password),
    };

    const userData = await UserModel.create(data);
    console.log('userData: ', userData);
    const token = await assignJwt(userData?._id);

    return response.status(status.OK).json({
      success: true,
      message: "User created",
      token,
    });
  } catch (error) {
    console.log('error: ', error);
    response.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error?.message,
    });
  }
};

module.exports = { register };
