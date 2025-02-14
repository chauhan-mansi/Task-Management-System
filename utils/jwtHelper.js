const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.createJwtToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

