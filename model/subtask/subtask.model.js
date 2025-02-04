const mongoose = require('mongoose')

const subTaskSchema = new mongoose.Schema (
    
       {
           subTaskName: { type: String, required: true },
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

const subTask = mongoose.model("subTask", subTaskSchema);
module.exports = subTask;
