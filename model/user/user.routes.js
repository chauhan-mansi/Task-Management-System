const express = require("express");

const { createUser, getUser, getUserById, updateUser, deleteUser } = require("./user.controller");

const router = express.Router();
router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
