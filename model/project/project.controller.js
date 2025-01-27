const project = require("./project.model");

exports.createProject = async (req, res) => {
  try {
    const { name, description, maxTeamSize } = req.body;
    const existingProject = await project.findOne({ description });
    if (existingProject) {
      return res
        .status(401)
        .json({ success: false, message: "Project already exist" });
    }
    const projectData = new project({
      name,
      description,
      maxTeamSize,
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
    const projects = await project.find();
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
  const { name, description, maxTeamSize, id } = req.body;
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
