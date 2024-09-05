import axios from 'axios';

const apiUrl = "http://localhost:5000/api"; // Adjust the base URL as needed

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Create a post
 const createPost = async (postData) => {
    try {
        const response = await axios.post(`${apiUrl}/posts`, postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Get a post by ID
const getPostById = async (postId) => {
    try {
        const response = await axios.get(`${apiUrl}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

// Update a post
const updatePost = async (postId, postData) => {
    try {
        const response = await axios.put(`${apiUrl}/posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

// Delete a post
const deletePost = async (postId) => {
    try {
        await axios.delete(`${apiUrl}/posts/${postId}`);
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// Get all posts
const getAllPosts = async () => {
    try {
        const response = await api.get(`/posts`);
        // console.log("getAllPosts", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error.response.data.message);
        throw error;
    }
};

const getPostByUserID = async (userId) => {
    try {
        const response = await api.get(`/posts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error.response.data.message);
        throw error;
    }
};

 const deleteLikeForPost = async (userId, postId) => {
    const response = await axios.delete(`${apiUrl}/likes`, { data: { userId, postId } });
    return response.data;
};

export {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getAllPosts,
    getPostByUserID
};
