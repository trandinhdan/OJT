import axios from 'axios';

const apiUrl = "http://localhost:5000/api/follows"; // Adjust the base URL as needed

const createFollow = async (followData) => {
    try {
        const response = await axios.post(`${apiUrl}/follows`, followData )

        return response.data;
    } catch (error) {
        console.error("Error creating follow:", error);
        throw error;
    }
};

const getFollowById = async (followId) => {
    try {
        const response = await axios.get(`${apiUrl}/follows/${followId}`)

        return response.data;
    } catch (error) {
        console.error("Error fetching follow:", error);
        throw error;
    }
};

const deleteFollow = async (followId) => {
    try {
        await axios.delete(`${apiUrl}/follows/${followId}`)

        return true;
    } catch (error) {
        console.error("Error deleting follow:", error);
        throw error;
    }
};

const getAllFollows = async () => {
    try {
        const response = await axios.get(`${apiUrl}/follows`)

        return response.data;
    } catch (error) {
        console.error("Error fetching follows:", error);
        throw error;
    }
};

export {
    createFollow,
    getFollowById,
    deleteFollow,
    getAllFollows,
};
