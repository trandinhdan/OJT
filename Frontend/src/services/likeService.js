import axios from 'axios';


const apiUrl = "http://localhost:5000/api"; // Adjust the base URL as needed

const createLikeForPost = async (user, postData) => {
    try {
        // const postId = postData._id;
        // const ownerUser_id = postData.user_id._id;
        const response = await axios.post(`${apiUrl}/likes/post`, { user: user, postData: postData });

        return response.data;
    } catch (error) {
        console.error("Error creating like for post:", error);
        throw error;
    }
};

const createLikeForComment = async (userId, commentId) => {
    try {
        const response = await axios.post(`${apiUrl}/likes/comment`, { user_id: userId, comment_id: commentId });
        return response.data;
    } catch (error) {
        console.error("Error creating like for comment:", error);
        throw error;
    }
};

const getLikeById = async (likeId) => {
    try {
        const response = await axios.get(`${apiUrl}/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching like:", error);
        throw error;
    }
};

const deleteLike = async (likeId) => {
    try {
        await axios.delete(`${apiUrl}/likes/${likeId}`);
        return true;
    } catch (error) {
        console.error("Error deleting like:", error);
        throw error;
    }
};

const deleteLikeForPost = async (userId, postId) => {
    try {
        const response = await axios.delete(`${apiUrl}/likes/post`, { data: { user_id: userId, post_id: postId } });
        return response.data;
    } catch (error) {
        console.error("Error deleting like for post:", error);
        throw error;
    }
};

const getAllLikes = async () => {
    try {
        const response = await axios.get(`${apiUrl}/likes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
    }
};

export {
    createLikeForPost,
    createLikeForComment,
    getLikeById,
    deleteLike,
    deleteLikeForPost,
    getAllLikes,
};
