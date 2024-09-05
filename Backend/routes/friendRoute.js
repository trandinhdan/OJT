const express = require("express");
const friendController = require("../controllers/friendController");

const router = express.Router();

router.post('/',  friendController.createFriendRequest);
router.get('/', friendController.getAllFriends);
router.post('/check', friendController.friendCheckStatus);
router.get('/:friendId', friendController.getFriendById);
router.get('/user/:userId', friendController.getAllFriendsByUserId);
router.delete('/delete/request', friendController.deleteFriendRequest);
router.delete('/delete/friend', friendController.deleteFriend);
router.get('/requests/:userId', friendController.getFriendRequestsByUserId);
router.put('/update', friendController.updateFriendStatus);
router.get('/requestsSend/:userId', friendController.getFriendRequestsSentByUserId);
router.get('/all/:userId', friendController.getAllFriendsWithUserId);
router.get('/allTag/:userId', friendController.getAllFriendsToTag);
// update friend
router.post('/update', friendController.updateFriendStatus);
module.exports = router;
