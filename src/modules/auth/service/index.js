const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Crypto = require("node:crypto");

const assignJwt = async (userId) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw Error("JWT_SECRET is required");
    }

    const token = jwt.sign({ _id: userId }, jwtSecret, { expiresIn: "24h" });
    return token;
  } catch (error) {
    throw new Error(error?.message || "Error while create jwt token", {
      cause: error,
    });
  }
};

const verifyJwt = async (token) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw Error("JWT_SECRET is required");
    }

    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error?.message || "Error while verify jwt token", {
      cause: error,
    });
  }
};

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw Error("Error while hash password", error);
  }
};

const generateOtp = async () => {
  return Crypto.randomInt(100000, 999999);
};

module.exports = { assignJwt, verifyJwt, hashPassword, generateOtp };
