const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

exports.postRegister = async (req, res) => {
  // console.log("register");
  try {
    const newUser = await userService.registerUser(req.body);
    console.log(newUser);
    res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({
      message: "Logged in successfully",
      token,
      userName: user.username,
      userId: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.postCheckPassword = async (req, res) => {
  try {
    const adminPassword = req.user.password;
    const enteredPassword = req.body.password;

    const result = await userService.checkPassword(
      adminPassword,
      enteredPassword
    );
    if (result) {
      res.status(200).json({ message: "Right Password" });
    } else {
      res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "There are some unknown mistakes, please try again" });
  }
};

exports.postLogout = async (req, res) => {
  try {
    // JWT không cần logout vì token sẽ hết hạn tự động.
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while logging out",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("GET /users hit");
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    // console.log('user', user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching user",
      error: error.message,
    });
  }
};

exports.getAllUsersExceptCurrent = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId)

    const users = await userService.getAllUsersExceptCurrent(userId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
};
