import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsThunk, createPostThunk, updatePostThunk, deletePostThunk, fetchPostByIdThunk } from '../posts/postThunk';

const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPostsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPostsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPostThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updatePostThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePostThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(post => post._id === action.payload._id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(updatePostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deletePostThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter(post => post._id !== action.meta.arg);
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPostByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(fetchPostByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default postSlice.reducer;
