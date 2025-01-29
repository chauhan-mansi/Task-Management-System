import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const isTokenBlacklisted = require("../utils/tokenManager");

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.token;
  if (!token) {
    return errorResponse(
      res.status(401).json({ success: false, message: "Internal Server Error" })
    );
  }

  if (isTokenBlacklisted(token)) {
    return errorResponse(
      res.status(401).json({ success: false, message: "Token is  Blacklisted" })
    );
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(
      res.status(401).json({ success: false, message: "Internal Server Error" })
    );
  }
};
