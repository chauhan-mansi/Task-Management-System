const task = require("./task.model");
const userSchema = require("../user/user.model");

exports.createTask = async (req, res) => {
  try {
    const {
      taskName,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    } = req.body;

    const existingTask = await task.findOne({ taskName });
    if (existingTask) {
      return res
        .status(401)
        .json({ success: false, message: "Task already exist" });
    }
    const existingUser = await userSchema.findById(user);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const taskData = new project({
      taskName,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    });
    await taskData.save();
    res.status(200).json({ success: true, message: "Task Created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Internal Server Error" });
  }
};
