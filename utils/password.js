const bcrypt = require("bcryptjs");

const getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (inputPassword, userPassword) => {
  return bcrypt.compare(inputPassword, userPassword);
};

module.exports = { comparePassword, getHashPassword };
