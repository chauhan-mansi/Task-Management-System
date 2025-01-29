const express = require("express");

const {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("./project.controller");
const { isAuthenticateUser } = require("../../middleware/validate");


const router = express.Router();
router.post("/", isAuthenticateUser,createProject);
router.get("/", isAuthenticateUser, getProject);
router.get("/:id",isAuthenticateUser, getProjectById);
router.put("/", isAuthenticateUser, updateProject);
router.delete("/:id",isAuthenticateUser, deleteProject);

module.exports = router;
