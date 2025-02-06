const express = require("express");

const { isAuthenticateUser } = require("../../middleware/validate");
const { createReply, getReply, getReplyById, updateReply, deleteReply } = require("./reply.controller");

const router = express.Router();
router.post("/", createReply);
router.get("/", getReply);
router.get("/:id", getReplyById);
router.put("/", updateReply);
router.delete("/:id", deleteReply);

module.exports = router;
