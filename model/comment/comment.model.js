const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentMessage: { type: String, required: true },
    source: { type: Buffer, required:false },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;
