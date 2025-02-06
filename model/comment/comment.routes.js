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
router.post("/", isAuthenticateUser, createComment);
router.get("/", isAuthenticateUser, getComment);
router.get("/:id", isAuthenticateUser, getCommentById);
router.put("/", isAuthenticateUser, updateComment);
router.delete("/:id", isAuthenticateUser, deleteComment);

module.exports = router;
