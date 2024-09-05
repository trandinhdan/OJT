const express = require("express");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.get('/:userId', notificationController.getNotificationByUserId);
router.get('/unread/:userId', notificationController.getUnreadNotificationByUserId);
router.put('/', notificationController.updateNotification);

module.exports = router;
