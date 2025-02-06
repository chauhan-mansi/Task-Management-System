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

router.post("/", createTask);
router.get("/", getTask);
router.get("/:id", getTaskById);
router.put("/", isAuthenticateUser, updateTask);
router.delete("/:id", isAuthenticateUser, deleteTask);
module.exports = router;
