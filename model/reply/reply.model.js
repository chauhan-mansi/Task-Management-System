const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    replyMessage: { type: String, required: true },
    source: { type: Buffer, required:false },
    commentId:{type: mongoose.Schema.Types.ObjectId, ref: "Comment"},
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const reply = mongoose.model("Reply", replySchema);
module.exports = reply;
