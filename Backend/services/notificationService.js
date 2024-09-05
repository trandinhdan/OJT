const Notification = require('../models/NotificationModel');
const WebSocket = require('ws');
const server = require('http').createServer();
const wss = new WebSocket.Server({ server });

let clients = {};

wss.on('connection', (ws, req) => {
    const userId = req.url.split('/').pop();
    if (userId) {
        clients[userId] = ws;
        ws.on('close', () => {
            delete clients[userId];
        });
    }
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });
});

server.listen(8080, () => {
    console.log('WebSocket server is running on port 8080');
});

const createNotification = async (notificationData) => {
    // if(notificationData.ownerUser_id === notificationData.user_id._id) return;
    // console.log("notificationData: ", notificationData)
    const NotificationData = {
        ownerUser_id: notificationData.ownerUser_id,
        type: notificationData.type,
        user_id: notificationData.user_id._id,
        post_id: notificationData.post_id,
        comment_id: notificationData.comment_id
    }
    const notification = new Notification(NotificationData);
    const savedNotification = await notification.save();
    notificationData._id = savedNotification._id;
    // Send notification via WebSocket
    const userId = notificationData.ownerUser_id.toString();
    if (clients[userId]) {
        clients[userId].send(JSON.stringify(notificationData));
    }

    return savedNotification;
};

const getNotificationById = async (notificationId) => {
    return await Notification.findById(notificationId).populate('user_id');
};

const getNotificationByUserId = async (userId) => {
    return await Notification.find({ ownerUser_id: userId }).populate('user_id').populate('post_id').populate('comment_id');
};

const getUnreadNotificationByUserId = async (userId) => {
    return await Notification.find({ ownerUser_id: userId, read: 'false' }).populate('user_id');
};

const updateNotification = async (notificationData) => {
    return await Notification.findByIdAndUpdate(notificationData._id, notificationData, { new: true });
};


const deleteNotification = async (notificationId) => {
    return await Notification.findByIdAndDelete(notificationId);
};

const getAllNotifications = async () => {
    return await Notification.find().populate('user_id');
};

module.exports = {
    createNotification,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getAllNotifications,
    getNotificationByUserId,
    getUnreadNotificationByUserId
};
