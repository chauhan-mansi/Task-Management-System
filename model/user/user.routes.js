const express = require("express");

const {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
} = require("./user.controller");
const { isAuthenticateUser } = require("../../middleware/validate");


const router = express.Router();
router.post("/", createUser);
router.get("/",isAuthenticateUser, getUser);
router.get("/:id",isAuthenticateUser, getUserById);
router.put("/",isAuthenticateUser,  updateUser);
router.delete("/:id",isAuthenticateUser, deleteUser);
router.post("/login",userLogin);
module.exports = router;
