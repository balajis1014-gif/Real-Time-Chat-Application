const bcrypt = require("bcrypt");

const comparePassword = async (currentPass, userPass) => {
  return await bcrypt.compare(currentPass, userPass);
};

module.exports = { comparePassword };
