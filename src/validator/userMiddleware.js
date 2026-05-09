const { request, response } = require("express");
const { default: status } = require("http-status");
const jwt = require("jsonwebtoken");
const { CONFIG } = require("../config");
const UserModel = require("../schema/user");
const { CONSTANT } = require("../utils/constent");

module.exports = async function (request, response, next) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(status.UNAUTHORIZED).json({
        success: false,
        message: "Missing authorization token",
      });
    }

    const token = authHeader.split(" ")[1];

    let verifyToken;
    try {
      verifyToken = await jwt.verify(token, CONFIG.JWT_SECRET);
    } catch (error) {
      return response.status(status.UNAUTHORIZED).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await UserModel.findOne({
      _id: verifyToken?._id,
      status: CONSTANT.USER_STATUS.ACTIVE,
    })
      .select("-__v -updatedAt")
      .lean();

    if (!user) {
      return response.status(status.UNAUTHORIZED).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    request.user = user;
    return next();
  } catch (error) {
    console.log("error: ", error);
    return response.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
