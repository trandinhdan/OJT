import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersThunk, createUserThunk, updateUserThunk, deleteUserThunk, fetchUserByIdThunk } from '../users/userThunk';

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUserIndex = state.users.findIndex((user) => user._id === action.payload._id);
                state.users[updatedUserIndex] = action.payload;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
         
    },
});

export default userSlice.reducer;