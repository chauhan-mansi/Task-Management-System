const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      required: true,
    },
    priority: { type: String, enum: ["High", "Medium", "Low"] },
    estimatedHours: { type: Number, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

const task = mongoose.model("Task", taskSchema);
module.exports = task;
