const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");


const secretKey = "your-secret-key";

const registerUser = async (userData) => {
    // console.log("registerService", userData);
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    if (userData.password !== userData.confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
        username: userData.fullName,
        fullName: userData.fullName,
        email: userData.email,
        password: hashedPassword,
        phone: userData.phone,
        profilePicture: "/img/avaImg/ava.jpg"
    });
    console.log("new", user);

    return await user.save();
};

const loginUser = async (email, password) => {
    console.log(`Looking for user with email: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found, please sign up.");
    }

    const doMatch = await bcrypt.compare(password, user.password);


    if (!doMatch) {
        throw new Error("Invalid password, please try again.");
    }

    const token = jwt.sign(
        { userId: user._id, userName: user.username, role: user.role, fullName: user.fullName },
        secretKey,
        { expiresIn: "30d" },
    );

    return { user, token };
};

const checkPassword = async (adminPassword, enteredPassword) => {
    const result = await bcrypt.compare(enteredPassword, adminPassword);
    return result;
};

const logoutUser = async (token) => { };

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password -profilePicture");
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Could not fetch user");
    }
};

const getAllUsersExceptCurrent = async (userId) => {
    try {
        const users = await User.find({ _id: { $ne: userId } });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
};



module.exports = {
    registerUser,
    loginUser,
    checkPassword,
    logoutUser,
    getAllUsers,
    getUserById,
    getAllUsersExceptCurrent
};
