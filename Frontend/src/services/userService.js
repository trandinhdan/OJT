import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const apiUrl = "http://localhost:5000/api"; // Adjust the base URL as needed

// Register a user
const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/users/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:");
        throw error.response.data;
    }
};

// Login a user
const loginUser = async (email, password) => {
    console.log("Login user:", email, password);
    try {
        const response = await axios.post(`${apiUrl}/users/login`, {email, password});
        // console.log("LoginUser>>", response.data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            const decodedToken = jwtDecode(response.data.token);
            return decodedToken;
        }
    } catch (error) {
        console.error("Error logging in user:", error.response.data.message);
        throw error;
    }
};

// Check password
const checkPassword = async (adminPassword, enteredPassword) => {
    try {
        const response = await axios.post(`${apiUrl}/users/check-password`, {adminPassword, enteredPassword});
        return response.data;
    } catch (error) {
        console.error("Error checking password:", error);
        throw error;
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/users`);
        // console.log("GetAllUsers>>", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
    
const getAllUsersExceptCurrent = async (userId) => {
    try {
       
        const response = await axios.get(`${apiUrl}/users/getAllUsersExceptCurrent/${userId}`);
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


// Logout a user
const logoutUser = async () => {
    try {
        // console.log("1. Logout user...");
        const response = await axios.post(`${apiUrl}/users/logout`);
        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

// Get user by ID
const getUserById = async (userId) => {
    try {
        // console.log('service')
        // console.log(userId)
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};


export{
    getUserById
}
export default {
    registerUser,
    loginUser,
    checkPassword,
    getAllUsers,
    logoutUser,
    getAllUsersExceptCurrent
};
