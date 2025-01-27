const express = require("express");

const {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("./project.controller");

const router = express.Router();
router.post("/", createProject);
router.get("/", getProject);
router.get("/:id", getProjectById);
router.put("/", updateProject);
router.delete("/:id", deleteProject);
module.exports = router;
