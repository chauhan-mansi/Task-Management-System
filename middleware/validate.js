// const dotenv = require("dotenv");
// const { isTokenBlacklisted } = require("../utils/tokenManager");

// dotenv.config();

// const isAuthenticateUser = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log("req ----->", req.route.path);
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {  
//      return res.status(401).json({ success: false, message: "Authentication Failed" })
//   }

//   const token = authHeader.split(" ")[1];


  
//   if (isTokenBlacklisted(token)) {
//     return errorResponse(
//       res.status(401).json({ success: false, message: "Token is Blacklisted" })
//     );
//   }

//   req.token = token;
//   next();
// };
// module.exports = { isAuthenticateUser };


const jwt = require("jsonwebtoken");

const isAuthenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authentication Failed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = { isAuthenticateUser };
