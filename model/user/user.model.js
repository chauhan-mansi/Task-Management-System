const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profession: { type: String, require: true },
    role: { type: String, required: true },
    designation: { type: String, required: true },
    isActive: { type: String, enum: ["active", "notactive"], required: true },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
