const project = require("./project.model");
const userSchema = require("../user/user.model");
const jwt = require("jsonwebtoken");

// exports.createProject = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; 
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     const { name, description, maxTeamSize, user } = req.body;
//     const existingUser = await userSchema.findById(user);
//     if (!existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User not found" });
//     }
//     const projectData = new project({
//       name,
//       description,
//       maxTeamSize,
//       user: userId,
//     });
//     await projectData.save();
//     res.status(200).json({ success: true, message: "Project Created" });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ success: false, message: "Internal Server Error" });
//   }
// };


exports.createProject = async (req, res) => {
  try {
    const { name, description, maxTeamSize} = req.body;
  
    const userId = req.user.id; 

    const existingUser = await userSchema.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const projectData = new project({
      name,
      description,
      maxTeamSize,
      user: userId, 
    });

    await projectData.save();
    res.status(200).json({ 
      success: true, 
      message: "Project Created", 
      project: projectData 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;
    const perPage = limit;
    const currentPage = page;
    const totalData = await project.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const projects = await project
      .find()
      .populate(["user"])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      success: true,
      data: {
        projects,
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
    return res.status(500).json({ success: false, message: "Internal Server Error" });
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
    return res.status(500).json({ success: false, message: "Internal Server Error" });
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
    return res.status(500).json({ success: false, message: "Internal server error" });
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
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
