import { createAsyncThunk } from '@reduxjs/toolkit';
import getAllUsersExceptCurrent from '../../services/userService';
import userService from '../../services/userService';

export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async (userId) => {
    // console.log("userId: ", userId)
    const response = await userService.getAllUsersExceptCurrent(userId);
    // console.log("response: ", response)
    return response;
});

export const fetchAllUsersExceptCurrentThunk = createAsyncThunk('users/fetchAllUsersExceptCurrent', async (userId) => {
    // console.log("userId: ", userId)
    const response = await userService.getAllUsersExceptCurrent(userId);
    // console.log("response: ", response)
    return response;
});

// export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async () => {
//     console.log("userId: ", await getAllUsers())
//     const response = await getAllUsers();
//     console.log("response: ", response)
//     return response.payload;
// });

export const createUserThunk = createAsyncThunk('users/createUser', async (userData) => {
    const response = await userService.createUser(userData);
    return response;
});

export const updateUserThunk = createAsyncThunk('users/updateUser', async ({ userId, userData }) => {
    const response = await userService.updateUser(userId, userData);
    return response;
});


export const fetchUserByIdThunk = createAsyncThunk('users/fetchUserById', async (userId) => {
    const response = await userService.getUserById(userId);
    return response;
});