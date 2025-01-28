const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    maxTeamSize: { type: Number, require: true, maxLength: 6 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const project = mongoose.model("Project", projectSchema);
module.exports = project;
