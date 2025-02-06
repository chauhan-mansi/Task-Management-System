const express = require("express");
const {
  createSubTask,
  getSubTask,
  getSubTaskById,
  updateSubTask,
  deleteSubTask,
} = require("./subtask.controller");
const { isAuthenticateUser } = require("../../middleware/validate");

const router = express.Router();

router.post("/", isAuthenticateUser, createSubTask);
router.get("/", isAuthenticateUser, getSubTask);
router.get("/:id", isAuthenticateUser, getSubTaskById);
router.put("/", isAuthenticateUser, updateSubTask);
router.delete("/:id", isAuthenticateUser, deleteSubTask);

module.exports = router;
