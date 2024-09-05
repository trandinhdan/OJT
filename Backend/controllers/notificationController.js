const notificationService = require('../services/notificationService');

const createNotification = async (req, res) => {
    try {
        const notification = await notificationService.createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotificationByUserId = async (req, res) => {
    try {
        // console.log(req.params.userId);
        const notifications = await notificationService.getNotificationByUserId(req.params.userId);
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUnreadNotificationByUserId = async (req, res) => {
    try {
        // console.log(req.params.userId);
        const notifications = await notificationService.getUnreadNotificationByUserId(req.params.userId);
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotificationById = async (req, res) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateNotification = async (req, res) => {
    try {
        const notification = await notificationService.updateNotification(req.body);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notification = await notificationService.deleteNotification(req.params.id);
        if (notification) {
            res.json({ message: 'Notification deleted' });
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationByUserId,
    getUnreadNotificationByUserId
};
