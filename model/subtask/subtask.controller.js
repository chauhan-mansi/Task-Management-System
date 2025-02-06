const subTask = require("./subtask.model");
const userSchema = require("../user/user.model");

exports.createSubTask = async (req, res) => {
  try {
    const {
      taskName,
      subTaskName,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    } = req.body;

    const existingUser = await userSchema.findById(assignee, reporter);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const subTaskData = new subTask({
      taskName,
      subTaskName,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    });
    await subTaskData.save();
    res.status(200).json({ success: true, message: "SubTask Created" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getSubTask = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;
    const perPage = limit;
    const currentPage = page;
    const totalData = await subTask.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const subTasks = await subTask
      .find()
      .populate(["assignee", "reporter", "taskName"])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      success: true,
      data: {
        subTasks,
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

exports.getSubTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingSubTask = await subTask.findById(id);
    if (!existingSubTask) {
      return res
        .status(404)
        .json({ success: false, message: "subTask does not exists" });
    }

    res.status(200).json({ success: true, data: existingSubTask });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateSubTask = async (req, res) => {
  const {
    taskName,
    subTaskName,
    description,
    assignee,
    reporter,
    status,
    priority,
    estimatedHours,
    id,
  } = req.body;
  try {
    const existingSubTask = await subTask.findById(id);
    if (!existingSubTask) {
      return res
        .status(400)
        .json({ success: false, message: "SubTask does not exists" });
    }
    await subTask.findByIdAndUpdate(id, {
      taskName,
      subTaskName,
      description,
      assignee,
      reporter,
      status,
      priority,
      estimatedHours,
    });
    res
      .status(200)
      .json({ success: true, message: "SubTask updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteSubTask = async (req, res) => {
  const { id } = req.params;
  try {
    const existingSubTask = await subTask.findById(id);
    if (!existingSubTask) {
      return res
        .status(400)
        .json({ success: false, message: "SubTask does not exists" });
    }
    await subTask.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "SubTask deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
