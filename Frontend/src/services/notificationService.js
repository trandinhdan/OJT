import axios from 'axios';

const apiUrl = "http://localhost:5000/api"; // Adjust the base URL as needed

const createNotification = async (notificationData) => {
    try {
        const response = await axios.post(`${apiUrl}/notifications`, notificationData);
        return response.data;
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};

const getNotificationById = async (notificationId) => {
    try {
        const response = await axios.get(`${apiUrl}/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notification:", error);
        throw error;
    }
};

const getNotificationByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/notifications/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notification:", error);
        throw error;
    }
};

const getUnreadNotificationByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/notifications/unread/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notification:", error);
        throw error;
    }
};

const updateNotification = async (notificationData) => {
    try {
        const response = await axios.put(`${apiUrl}/notifications`, notificationData);
        return response.data;
    } catch (error) {
        console.error("Error updating notification:", error);
        throw error;
    }
};

const deleteNotification = async (notificationId) => {
    try {
        await axios.delete(`${apiUrl}/notifications/${notificationId}`);
        return true;
    } catch (error) {
        console.error("Error deleting notification:", error);
        throw error;
    }
};

const getAllNotifications = async () => {
    try {
        const response = await axios.get(`${apiUrl}/notifications`);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export {
    createNotification,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getAllNotifications,
    getNotificationByUserId,
    getUnreadNotificationByUserId
};
