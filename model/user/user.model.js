const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
       type: String,
        required: true
       },
    email: { 
      type: String,
       required: true, 
       unique: true
       },
    password: { 
      type: String,
       required: true 
      },
    profession: { type: String, required: true },
    role: { type: String, required: true, default: "project" },
    designation: { type: String, required: true },
    isActive: { type: String, enum: ["true", "false"], required: true },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
