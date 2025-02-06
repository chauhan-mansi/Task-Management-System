const reply = require("./reply.model");

exports.createReply = async (req, res) => {
  try {
    const { replyMessage, source, commentId, taskId, userId } = req.body;
    const replyData = new reply({
      replyMessage,
      commentId,
      source,
      taskId,
      userId,
    });
    await replyData.save();
    res.status(200).json({ success: true, message: "Reply Added" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getReply = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;
    const perPage = limit;
    const currentPage = page;
    const totalData = await reply.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const replies = await reply
      .find()
      .populate(["userId", "taskId", "commentId"])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      success: true,
      data: {
        replies,
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

exports.getReplyById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingReply = await reply.findById(id);
    if (!existingReply) {
      return res
        .status(404)
        .json({ success: false, message: "Reply does not exists" });
    }

    res.status(200).json({ success: true, data: existingReply });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateReply = async (req, res) => {
  const { replyMessage, source, commentId, taskId, userId, id } = req.body;
  try {
    const existingReply = await reply.findById(id);
    if (!existingReply) {
      return res
        .status(400)
        .json({ success: false, message: "Reply does not exist" });
    }
    await reply.findByIdAndUpdate(id, {
      replyMessage,
      source,
      commentId,
      taskId,
      userId,
    });
    res
      .status(200)
      .json({ success: true, message: "Reply updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteReply = async (req, res) => {
  const { id } = req.params;
  try {
    const existingReply = await reply.findById(id);
    if (!existingReply) {
      return res
        .status(400)
        .json({ success: false, message: "Reply does not exists" });
    }
    await reply.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Reply deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
