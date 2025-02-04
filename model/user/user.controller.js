const user = require("./user.model");
const jwt = require("jsonwebtoken");

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password, profession, role, designation, isActive } =
//       req.body;
//     const existingUser = await user.findOne({ name });
//     if (existingUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User already exist" });
//     }
//     const userData = new user({
//       name,
//       email,
//       password,
//       profession,
//       role,
//       designation,
//       isActive,
//     });
//     await userData.save();
//     res.status(200).json({ success: true, message: "User Account Created" });
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ success: false, message: "Internal Server Error" });
//   }
// };
exports.registerUser = async (req, res) => {
  try {
    const { fullName, password, email: emailInput } = req.body;

    const allowedFields = ["fullName", "email", "password"];

    if (!validateAllowedFields(allowedFields, req.body, res)) return;

    const email = emailInput.toLowerCase();

    const isValid = validateInput(
      userValidations,
      { fullName, email, password },
      res
    );
    if (!isValid) return;

    const hashedPassword = await getHashPassword(password);

    let newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    newUser = await userModel.findById(
      newUser._id,
      "fullName email password createdAt updatedAt"
    );

    const { _id, createdAt, updatedAt } = newUser;
    const updatedUser = {
      id: _id,
      fullName,
      email,
      createdAt,
      updatedAt,
    };

    return successResponse(
      res,
      updatedUser,
      userRegisterMessage,
      statusCodes.SUCCESS
    );
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      logger.error(`Registration error: ${emailUniqueMessage}`);
      return errorResponse(
        res,
        new Error(ValidationErrorMessage),
        emailUniqueMessage,
        statusCodes.VALIDATION_ERROR
      );
    }

    logger.error(`Registration error: ${error.message}`);
    return errorResponse(
      res,
      error,
      ServerErrorMessage,
      statusCodes.SERVER_ERROR
    );
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
    res.status(500).json({ success: false, message: "Internal server error" });
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
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(
        res
          .status(401)
          .json({ success: false, message: "Invalid email or password" })
      );
    }

    const user = await user.findOne({ email });
    if (!user) {
      return errorResponse(
        res.status(401).json({ success: false, message: "User not found" })
      );
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return errorResponse(
        res
          .status(401)
          .json({ success: false, message: "Incorrect email or password" })
      );
    }

    const accessToken = generateAccessToken(user);

    return successResponse(
      res,
      {
        id: user._id,
        fullName: user.fullName,
        isProfileComplete: user.isProfileComplete,
        accessToken,
        gender: user.gender || "",
      },
      res
        .status(200)
        .json({ success: true, message: "User successfully loggedin" })
    );
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Internal Server Error" });
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
      return errorResponse(
        res,
        new Error(ValidationErrorMessage),
        PasswordShouldNotSame,
        statusCodes.VALIDATION_ERROR
      );
    }

    if (newPassword !== confirmNewPassword) {
      return errorResponse(
        res,
        new Error(ValidationErrorMessage),
        PasswordNotMatch,
        statusCodes.VALIDATION_ERROR
      );
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return errorResponse(
        res,
        new Error(UserNotFoundMessage),
        UserNotFoundMessage,
        statusCodes.NOT_FOUND
      );
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return errorResponse(
        res,
        new Error(UnauthorizedErrorMessage),
        IncorrectCurrentPassword,
        statusCodes.UNAUTHORIZED
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return successResponse(
      res,
      undefined,
      PasswordResetSucessMessage,
      statusCodes.SUCCESS
    );
  } catch (error) {
    logger.error(`reset password error: ${error.message}`);
    return errorResponse(
      res,
      error,
      ServerErrorMessage,
      statusCodes.SERVER_ERROR
    );
  }
};
