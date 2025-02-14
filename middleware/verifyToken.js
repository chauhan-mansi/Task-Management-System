import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const isTokenBlacklisted = require("../utils/tokenManager");

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; 

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ success: false, message: "Token is Blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};
