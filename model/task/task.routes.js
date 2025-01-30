const express = require("express");
const {
  createTask,
  getTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("./task.controller");
const { isAuthenticateUser } = require("../../middleware/validate");

const router = express.Router();

router.post("/", isAuthenticateUser, createTask);
router.get("/", isAuthenticateUser, getTask);
router.get("/:id", isAuthenticateUser, getTaskById);
router.put("/", isAuthenticateUser, updateTask);
router.delete("/:id", isAuthenticateUser, deleteTask);
module.exports = router;
