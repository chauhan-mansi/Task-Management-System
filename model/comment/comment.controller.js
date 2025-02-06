const comment = require("./comment.model");

exports.createComment = async (req, res) => {
  try {
    const { commentMessage, source, taskId, userId } = req.body;
    const commentData = new comment({
      commentMessage,
      source,
      taskId,
      userId,
    });
    await commentData.save();
    res.status(200).json({ success: true, message: "Comment Added" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getComment = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;
    const perPage = limit;
    const currentPage = page;
    const totalData = await comment.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const comments = await comment
      .find()
      .populate(["userId", "taskId"])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      success: true,
      data: {
        comments,
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

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingComment = await comment.findById(id);
    if (!existingComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment does not exists" });
    }

    res.status(200).json({ success: true, data: existingComment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateComment = async (req, res) => {
  const { commentMessage, source, taskId, userId, id } = req.body;
  try {
    const existingComment = await comment.findById(id);
    if (!existingComment) {
      return res
        .status(400)
        .json({ success: false, message: "Comment does not exist" });
    }
    await comment.findByIdAndUpdate(id, {
      commentMessage,
      source,
      taskId,
      userId,
    });
    res
      .status(200)
      .json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const existingComment = await comment.findById(id);
    if (!existingComment) {
      return res
        .status(400)
        .json({ success: false, message: "Comment does not exists" });
    }
    await comment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
