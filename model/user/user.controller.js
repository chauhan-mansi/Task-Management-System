const { comparePassword, getHashPassword } = require("../../utils/password");
const user = require("./user.model");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, profession, role, designation, isActive } =
      req.body;

    const hashedPassword = await getHashPassword(password);

    let newUser = await user.create({
      name,
      email,
      profession,
      role,
      designation,
      isActive,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "User Registered successfully!", newUser });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      return res
        .status(401)
        .json({ message: "Email already exist please verify your email!!" });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }

    res.status(200).json({ success: true, data: existingUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password, profession, role, designation, isActive, id } =
    req.body;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });
    }
    await user.findByIdAndUpdate(id, {
      name,
      email,
      password,
      profession,
      role,
      designation,
      isActive,
    });
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });
    }
    await user.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const userss = await user.findOne({ email });
    if (!userss) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await comparePassword(password, userss.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const accessToken = generateAccessToken(userss);

    const formattedUser = {
      id: userss._id,
      fullName: userss.fullName,
      isProfileComplete: userss.isProfileComplete,
      accessToken,
      gender: userss.gender || "",
    };

    return res.status(200).json({
      success: true,
      message: "User successfully loggedin",
      formattedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (
      !validateInput(
        resetPasswordValidations,
        { newPassword, confirmNewPassword },
        res
      )
    )
      return;

    if (newPassword === currentPassword) {
      res
        .status(401)
        .json({ success: false, message: "Internal Server Error" });
    }

    if (newPassword !== confirmNewPassword) {
      res.status(401).json({
        success: false,
        message:
          "Your current password and new password is same please provide another password!!",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password Reset Successfull" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Internal Server Error" });
  }
};
