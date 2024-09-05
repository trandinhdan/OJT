import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPost, getPostById, updatePost, deletePost, getAllPosts } from '../../services/postService';

export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await getAllPosts();
    // console.log('thunk', response)
    return response;
});

export const createPostThunk = createAsyncThunk('posts/createPost', async (postData) => {
    const response = await createPost(postData);
    return response;
});

export const updatePostThunk = createAsyncThunk('posts/updatePost', async ({ postId, postData }) => {
    const response = await updatePost(postId, postData);
    return response;
});

export const deletePostThunk = createAsyncThunk('posts/deletePost', async (postId) => {
    await deletePost(postId);
    return postId;
});

export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (postId) => {
    const response = await getPostById(postId);
    return response;
});
