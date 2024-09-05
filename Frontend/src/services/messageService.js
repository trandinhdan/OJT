import axios from 'axios';

const apiUrl = "http://localhost:5000/api/message"; // Adjust the base URL as needed

const createMessage = async (messageData) => {
    try {
        const response = await axios.post(`${apiUrl}/messages`, messageData)

        return response.data;
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
};

const getMessageById = async (messageId) => {
    try {
        const response = await axios.get(`${apiUrl}/messages/${messageId}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching message:", error);
        throw error;
    }
};

const deleteMessage = async (messageId) => {
    try {
        await axios.delete(`${apiUrl}/messages/${messageId}`)

        return true;
    } catch (error) {
        console.error("Error deleting messages:", error);
        throw error;
    }
};

const getAllMessages = async () => {
    try {
        const response = await axios.get(`${apiUrl}/messages`)

        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};

export {
    createMessage,
    getMessageById,
    deleteMessage,
    getAllMessages,
};
