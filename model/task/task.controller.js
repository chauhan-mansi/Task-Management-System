// const task = require("./task.model");
// const userSchema = require("../user/user.model");

// exports.createTask = async (req, res) => {
//   try {
//     const {
//       taskName,
//       description,
//       assignee,
//       reporter,
//       status,
//       priority,
//       estimatedHours,
//     } = req.body;

//     const existingTask = await task.findOne({ taskName });
//     if (existingTask) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Task already exist" });
//     }
//     const existingUser = await userSchema.findById(assignee, reporter);
//     if (!existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User not found" });
//     }
//     const taskData = new task({
//       taskName,
//       description,
//       assignee,
//       reporter,
//       status,
//       priority,
//       estimatedHours,
//     });
//     await taskData.save();
//     res.status(200).json({ success: true, message: "Task Created" });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(401)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

const Task = require("./task.model");
const User = require("../user/user.model");
const Project = require("../project/project.model");

exports.createTask = async (req, res) => {
  try {
    const {
      projectId,
      title,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    } = req.body;

    const existingTask = await Task.findOne({ title, project: projectId });
    if (existingTask) {
      return res
        .status(400)
        .json({ success: false, message: "Task already exists" });
    }

    const assigneeExists = await User.findById(assignee);
    const reporterExists = await User.findById(reporter);
    if (!assigneeExists || !reporterExists) {
      return res
        .status(400)
        .json({ success: false, message: "Assignee or Reporter not found" });
    }

    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return res
        .status(400)
        .json({ success: false, message: "Project not found" });
    }

    const taskData = new Task({
      title,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
      project: projectId,
    });

    await taskData.save();
    res
      .status(200)
      .json({ success: true, message: "Task Created", task: taskData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId }).populate([
      "assignee",
      "reporter",
    ]);

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;
    const perPage = limit;
    const currentPage = page;
    const totalData = await Task.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const tasks = await Task.find()
      .populate(["assignee", "reporter"])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          totalData,
          totalPages,
          currentPage,
          perPage,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task does not exists" });
    }

    res.status(200).json({ success: true, data: existingTask });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  const {
    title,
    description,
    assignee,
    reporter,
    status,
    priority,
    estimatedHours,
    id,
  } = req.body;
  try {
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res
        .status(400)
        .json({ success: false, message: "Task does not exists" });
    }
    await Task.findByIdAndUpdate(id, {
      title,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    });
    res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res
        .status(400)
        .json({ success: false, message: "Task does not exists" });
    }
    await Task.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
