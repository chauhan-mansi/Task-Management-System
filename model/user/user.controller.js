const user = require("./user.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, profession, role, designation, isActive } =
      req.body;
    const existingUser = await user.findOne({ name });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }
    const userData = new user({
      name,
      email,
      password,
      profession,
      role,
      designation,
      isActive,
    });
    await userData.save();
    res.status(200).json({ success: true, message: "User Account Created" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Internal Server Error" });
  }
};
