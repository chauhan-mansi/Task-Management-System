const express = require("express");
const { createSubTask, getSubTask } = require("./subtask.controller");
const { isAuthenticateUser } = require("../../middleware/validate");

const router = express.Router();

router.post("/", isAuthenticateUser, createSubTask);
// router.get("/", isAuthenticateUser,getSubTask);

module.exports = router;
