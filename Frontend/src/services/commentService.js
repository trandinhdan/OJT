import axios from "axios";

const API_URL = "http://localhost:5000/api/comments";

// Tạo bình luận mới
const createComment = async (comment, post, user) => {
    try {
        const response = await axios.post(API_URL, {comment, post, user});
        return response.data;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

// Lấy thông tin bình luận theo ID
const getCommentById = async (commentId) => {
    try {
        const response = await axios.get(`${API_URL}/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting comment by ID:", error);
        throw error;
    }
};

// Cập nhật bình luận
const updateComment = async (commentId, commentData) => {
    try {
        const response = await axios.put(`${API_URL}/${commentId}`, commentData);
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

// Xóa bình luận
const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${API_URL}/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

// Lấy tất cả bình luận
const getAllComments = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error getting all comments:", error);
        throw error;
    }
};

export {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    getAllComments
};
