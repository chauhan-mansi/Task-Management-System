const express = require("express");
const { createTask } = require("./task.controller");
const { isAuthenticateUser } = require("../../middleware/validate");

const router = express.Router();

router.post("/", isAuthenticateUser, createTask);
module.exports = router;
