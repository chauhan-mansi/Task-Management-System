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

router.post("/", createSubTask);
router.get("/",  getSubTask);
router.get("/:id", getSubTaskById);
router.put("/", updateSubTask);
router.delete("/:id", deleteSubTask);

module.exports = router;
