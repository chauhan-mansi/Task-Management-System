const dotenv = require("dotenv");
const { isTokenBlacklisted } = require("../utils/tokenManager");

dotenv.config();

const isAuthenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("req ----->", req.route.path);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    
      res.status(401).json({ success: false, message: "Authentication Failed" })
    
  }

  const token = authHeader.split(" ")[1];

  if (isTokenBlacklisted(token)) {
    return errorResponse(
      res.status(401).json({ success: false, message: "Token is Blacklisted" })
    );
  }

  req.token = token;
  next();
};
module.exports = { isAuthenticateUser };
