const jwt = require("jsonwebtoken");
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

const hashPassword = (password) => {
  try {
    return Crypto.createHash("md5").update(password).digest("hex");
  } catch (error) {
    throw Error("Error while hash password", error);
  }
};

module.exports = { assignJwt, hashPassword };
