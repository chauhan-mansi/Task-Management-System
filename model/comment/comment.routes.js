const express = require("express");

const { isAuthenticateUser } = require("../../middleware/validate");
const {
  createComment,
  getComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("./comment.controller");

const router = express.Router();
router.post("/", createComment);
router.get("/", getComment);
router.get("/:id", getCommentById);
router.put("/", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
