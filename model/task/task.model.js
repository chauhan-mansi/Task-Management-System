const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
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
  },
  { timestamps: true }
);

const task = mongoose.model("Task", taskSchema);
module.exports = task;

