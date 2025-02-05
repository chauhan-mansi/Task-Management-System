const express = require("express");

const {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
  registerUser,
} = require("./user.controller");
const { isAuthenticateUser } = require("../../middleware/validate");

const router = express.Router();
router.post("/", registerUser);
router.get("/login", userLogin);
router.get("/", getUser);
router.get("/:id", isAuthenticateUser, getUserById);
router.put("/", isAuthenticateUser, updateUser);
router.delete("/:id", isAuthenticateUser, deleteUser);

module.exports = router;
