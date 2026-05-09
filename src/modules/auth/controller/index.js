const { request, response } = require("express");
const { default: status } = require("http-status");
const { hashPassword, assignJwt, generateOtp } = require("../service");
const UserModel = require("../../../schema/user");
const redisConnection = require("../../../connection/redis");
const { sendOtpMail } = require("../../../utils");
const { CONSTANT } = require("../../../utils/constent");
const { comparePassword } = require("../../user/service");

const register = async (request, response) => {
  try {
    const { firstName, lastName, email, password, phone } = request?.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message:
          "firstName or lastName or email or passowrd or phone fields are required",
      });
    }

    const existingUser = await UserModel.findOne({
      status: CONSTANT.USER_STATUS.ACTIVE,
      $or: [
        { email },
        {
          "phone.countryCode": phone?.countryCode,
          "phone.nationalNumber": phone?.nationalNumber,
        },
      ],
    }).lean();

    if (existingUser) {
      const isEmailExists = existingUser.email === email;

      return response.status(status.CONFLICT).json({
        success: false,
        message: isEmailExists
          ? "Email already exists"
          : "Phone number already exists",
      });
    }

    const data = {
      ...request.body,
      password: await hashPassword(password),
    };

    const userData = await UserModel.create(data);
    const token = await assignJwt(userData?._id);

    return response.status(status.OK).json({
      success: true,
      message: "User created",
      token,
    });
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error?.message,
    });
  }
};

const loginWithOtp = async (request, response) => {
  try {
    const { email, password } = request?.body;

    if (!email || !password) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message: "email or password fields are required",
      });
    }

    const user = await UserModel.findOne({ email })
      .select("-__v -updatedAt")
      .lean();

    const isMatch = await comparePassword(password, user?.password);
    if (!isMatch) {
      return response.status(status.not.NOT_FOUND).json({
        success: false,
        message: "Incorect password",
      });
    }

    if (!user) {
      return response.status(status.NOT_FOUND).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    const otp = await generateOtp();

    await redisConnection.set(`otp:${user?.email}`, otp, "EX", 300);

    const mailResponse = await sendOtpMail(user?.email, otp);

    return response.status(status.OK).json({
      success: true,
      message: "OTP send successfully to user email",
    });
  } catch (error) {
    return response.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error?.message,
    });
  }
};

const verifyOtp = async (request, response) => {
  try {
    const { email, otp } = request?.body;

    if (!email || !otp) {
      return response.status(status.BAD_REQUEST).json({
        success: false,
        message: "email or otp fields are required",
      });
    }

    const getUser = await UserModel.findOne({
      email,
      status: CONSTANT.USER_STATUS.ACTIVE,
    })
      .select("-__v -updatedAt")
      .lean();

    if (!getUser) {
      return response.status(status.NOT_FOUND).json({
        success: false,
        message: "User not found with given emil",
      });
    }

    const storedOtp = await redisConnection.get(`otp:${email}`);

    if (storedOtp !== otp) {
      throw Error("Invalid OTP please try again");
    }

    //Delete the store
    await redisConnection.del(`otp:${email}`);

    const token = await assignJwt(getUser?._id);
    return response.status(status.OK).json({
      success: true,
      message: "OTP verify successfully",
      token,
      data: getUser,
    });
  } catch (error) {
    return response.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error?.message,
    });
  }
};

module.exports = { register, loginWithOtp, verifyOtp };
