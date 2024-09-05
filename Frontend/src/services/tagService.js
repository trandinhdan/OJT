import axios from 'axios';

const apiUrl = "http://localhost:5000/api"; // Adjust the base URL as needed

// Create a tag
const createTag = async (tagData) => {
    try {
        console.log(tagData)
        const response = await axios.post(`${apiUrl}/tags`, tagData);
        return response.data;
    } catch (error) {
        console.error("Error creating tag:", error);
        throw error;
    }
};

// Get a tag by ID
const getTagById = async (tagId) => {
    try {
        const response = await axios.get(`${apiUrl}/tags/${tagId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tag:", error);
        throw error;
    }
};

// Update a tag
const updateTag = async (tagId, tagData) => {
    try {
        const response = await axios.put(`${apiUrl}/tags/${tagId}`, tagData);
        return response.data;
    } catch (error) {
        console.error("Error updating tag:", error);
        throw error;
    }
};

// Delete a tag
const deleteTag = async (tagId) => {
    try {
        await axios.delete(`${apiUrl}/tags/${tagId}`);
        return true;
    } catch (error) {
        console.error("Error deleting tag:", error);
        throw error;
    }
};

// Get all tags
const getAllTags = async () => {
    try {
        const response = await axios.get(`${apiUrl}/tags`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
};

// Add a tag to a post
const addTagToPost = async (postId, tagId) => {
    try {
        const response = await axios.post(`${apiUrl}/posts/${postId}/tags/${tagId}`);
        return response.data;
    } catch (error) {
        console.error("Error adding tag to post:", error);
        throw error;
    }
};

// Add a tag to a user
const addTagToUser = async (userId, tagId) => {
    try {
        const response = await axios.post(`${apiUrl}/users/${userId}/tags/${tagId}`);
        return response.data;
    } catch (error) {
        console.error("Error adding tag to user:", error);
        throw error;
    }
};

export {
    createTag,
    getTagById,
    updateTag,
    deleteTag,
    getAllTags,
    addTagToPost,
    addTagToUser,
};
