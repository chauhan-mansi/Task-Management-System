const express = require("express");

const {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
} = require("./user.controller");

const router = express.Router();
router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", userLogin);
module.exports = router;
