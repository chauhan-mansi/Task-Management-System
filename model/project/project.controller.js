const project = require("./project.model");
const userSchema = require("../user/user.model");

exports.createProject = async (req, res) => {
  try {
    const { name, description, maxTeamSize, user } = req.body;
    const existingProject = await project.findOne({ description });
    if (existingProject) {
      return res
        .status(401)
        .json({ success: false, message: "Project already exist" });
    }
    const existingUser = await userSchema.findById(user);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const projectData = new project({
      name,
      description,
      maxTeamSize,
      user,
    });
    await projectData.save();
    res.status(200).json({ success: true, message: "Project Created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const projects = await project.find().populate(["user"]);
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProject = await project.findById(id);
    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project does not exists" });
    }

    res.status(200).json({ success: true, data: existingProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateProject = async (req, res) => {
  const { name, description, maxTeamSize, user, id } = req.body;
  try {
    const existingProject = await project.findById(id);
    if (!existingProject) {
      return res
        .status(400)
        .json({ success: false, message: "Project does not exists" });
    }
    await project.findByIdAndUpdate(id, {
      name,
      description,
      maxTeamSize,
      user,
    });
    res
      .status(200)
      .json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProject = await project.findById(id);
    if (!existingProject) {
      return res
        .status(400)
        .json({ success: false, message: "Project does not exists" });
    }
    await project.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
