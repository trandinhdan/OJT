import axios from 'axios';

const apiUrl = "http://localhost:5000/api"; // Adjust the base URL as needed

const getFriendRequestsSentByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/friends/requestsSend/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching friend requests sent:", error);
        throw error;
    }
};

const getFriendRequestsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/friends/requests/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        throw error;
    }
};

const friendCheckStatus = async (friendData) => {
    try {
        const response = await axios.post(`${apiUrl}/friends`, friendData);
        return response.data;
    } catch (error) {
        console.error("Error checking friend status:", error);
        throw error;
    }
};

const createFriendRequest = async (formData) => {
    try {
        // console.log("formData(create): ", formData)
        const response = await axios.post(`${apiUrl}/friends`, formData);
        return response.data;
    } catch (error) {
        console.error("Error creating friend request:", error);
        throw error;
    }
};

const deleteFriendRequest = async (formData) => {
    try {
        console.log("formData(delete): ", formData);
        const response = await axios.delete(`${apiUrl}/friends/delete/request`, {
            data: formData
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting friend request:", error);
        throw error;
    }
};


const getFriendById = async (friendId) => {
    try {
        const response = await axios.get(`${apiUrl}/friends/${friendId}`)

        return response.data;
    } catch (error) {
        console.error("Error fetching friend:", error);
        throw error;
    }
};

const getAllFriendsWithUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/friends/all/${userId}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};

const updateFriendStatus = async (friendData) => {
    try {
        console.log("friendData: ", friendData)
        const response = await axios.put(`${apiUrl}/friends/update`, friendData)
        return response.data;
    } catch (error) {
        console.error("Error updating friend status:", error);
        throw error;
    }
};

const deleteFriend = async (friendData) => {
    try {
        await axios.delete(`${apiUrl}/friends/delete/friend`, {
            data: friendData
        });
        return true;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error; // Throw error to propagate it for higher-level handling
    }
};


const getAllFriends = async () => {
    try {
        const response = await axios.get(`${apiUrl}/friends`)

        return response.data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};

const getAllFriendsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/friends/user/${userId}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};

const getAllFriendsToTag = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/friends/allTag/${userId}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};


export {
    createFriendRequest,
    getFriendById,
    updateFriendStatus,
    deleteFriend,
    getAllFriends,
    friendCheckStatus,
    getAllFriendsByUserId,
    deleteFriendRequest,
    getFriendRequestsByUserId,
    getFriendRequestsSentByUserId,
    getAllFriendsWithUserId,
    getAllFriendsToTag
};
