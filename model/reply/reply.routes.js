const express = require("express");

const { isAuthenticateUser } = require("../../middleware/validate");
const {
  createReply,
  getReply,
  getReplyById,
  updateReply,
  deleteReply,
} = require("./reply.controller");

const router = express.Router();
router.post("/", isAuthenticateUser, createReply);
router.get("/", isAuthenticateUser, getReply);
router.get("/:id", isAuthenticateUser, getReplyById);
router.put("/", isAuthenticateUser, updateReply);
router.delete("/:id", isAuthenticateUser, deleteReply);

module.exports = router;
