const jwt = require("jsonwebtoken");
const Crypto = require("node:crypto");

const assignJwt = async (userId) => {
  try {
    const token = await jwt.sign({ _id: userId }, { expireIn: "10min" });
    return token;
  } catch (error) {
    throw Error("Error while create jwt token", error);
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
