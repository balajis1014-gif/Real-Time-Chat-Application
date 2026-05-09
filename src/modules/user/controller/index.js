const { request, response } = require("express");
const { default: status } = require("http-status");
const UserModel = require("../../../schema/user");
const { CONSTANT } = require("../../../utils/constent");
const { comparePassword } = require("../service");
const { hashPassword } = require("../../auth/service");

const detail = async (request, response) => {
  try {
    const user = request?.user;
    return response.status(status.OK).json({
      success: true,
      message: "User detail",
      data: user,
    });
  } catch (error) {
    throw Error("Error while geting user detail", error);
  }
};

const updateProfile = async (request, response) => {
  try {
    const data = request?.body;
    const user = request?.user;

    if (!user) {
      return response.status(status.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized access to update profile",
      });
    }

    if (data?.password || data?.email) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message: "Password and email are not to be update",
      });
    }

    const updateUser = await UserModel.findOneAndUpdate(
      {
        _id: user?._id,
        status: CONSTANT.USER_STATUS.ACTIVE,
      },
      { $set: data },
      { new: true },
    );

    return response.status(status.OK).json({
      success: true,
      message: "Profile updated",
      data: updateUser,
    });
  } catch (error) {
    throw Error("Error while update profile", error);
  }
};

const changePassword = async (request, response) => {
  try {
    const { newPassword, oldPassword } = request.body;
    const user = request?.user;

    if (newPassword === oldPassword) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message: "New password should be diffrent to old passowrd",
      });
    }

    const isMatch = await comparePassword(oldPassword, user?.password);
    if (!isMatch) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    const hashPass = await hashPassword(newPassword);
    await UserModel.findOneAndUpdate(
      { _id: user?._id, status: CONSTANT.USER_STATUS.ACTIVE },
      { password: hashPass },
      { new: true },
    );

    return response.status(status.OK).json({
      success: true,
      message: "New password changed successfully",
    });
  } catch (error) {
    throw Error("Error while change password", error);
  }
};

module.exports = { detail, updateProfile, changePassword };
