const friendService = require('../services/friendService');

const getAllFriendsToTag = async (req, res) => {
    try {
        const { userId } = req.params;
        const friends = await friendService.getAllFriendsToTag(userId);
        res.json(friends);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const getFriendRequestsByUserId = async (req, res) => {
    try {
        const friendRequests = await friendService.getFriendRequestsByUserId(req.params.userId);
        res.json(friendRequests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFriendRequestsSentByUserId = async (req, res) => {
    try {
        const friendRequests = await friendService.getFriendRequestsSentByUserId(req.params.userId);
        res.json(friendRequests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const friendCheckStatus = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const friend_id = req.body.friend_id;
        const friend = await friendService.friendCheckStatus({ user_id, friend_id });
        if (friend) {
            res.json(friend);
        } else {
            res.status(404).json({ message: 'Friend not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const createFriendRequest = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const friend_id = req.body.friend_id;
        const user_fullName = req.body.user_fullName;
        if (user_id === friend_id) {
            return res.status(400).json({ message: 'You cannot add yourself as a friend' });
        }
        const friendRequest = await friendService.createFriendRequest({ user_id, friend_id, user_fullName });
        res.status(201).json(friendRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFriendRequest = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const friend_id = req.body.friend_id;

        const friend = await friendService.deleteFriendRequest({ user_id, friend_id });
        if (friend) {
            res.status(201).json(friend);
        } else {
            res.status(404).json({ message: 'Friend request not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFriendsWithUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friends = await friendService.getAllFriendsWithUserId(userId);
        res.json(friends);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFriends = async (req, res) => {
    try {
        const friends = await friendService.getAllFriends();
        res.json(friends);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFriendById = async (req, res) => {
    try {
        const friend_id = req.params.id;
        const user_id = req.body.user_id;
        const friend = await friendService.getFriendById({ friend_id, user_id });
        if (friend) {
            res.json(friend);
        } else {
            res.status(404).json({ message: 'Friend not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFriendStatus = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const friend_id = req.body.friend_id;
        const status = req.body.status;
        const friend_fullName = req.body.friend_fullName;
        const friend = await friendService.updateFriendStatus({ user_id, friend_id, status, friend_fullName });
        if (friend) {
            res.json(friend);
        } else {
            res.status(404).json({ message: 'Friend not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFriend = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const friend_id = req.body.friend_id;
        const friend = await friendService.deleteFriend({ user_id, friend_id });
        if (friend) {
            res.json({ message: 'Friend deleted' });
        } else {
            res.status(404).json({ message: 'Friend not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFriendsByUserId = async (req, res) => {
    try {
        const friendId = req.params.userId
        // console.log('controller')
        const friends = await friendService.getAllFriendsByUserId(friendId);
        res.json(friends);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    createFriendRequest,
    getAllFriends,
    getFriendById,
    updateFriendStatus,
    deleteFriend,
    friendCheckStatus,
    getAllFriendsByUserId,
    deleteFriendRequest,
    getFriendRequestsByUserId,
    getFriendRequestsSentByUserId,
    getAllFriendsWithUserId,
    getAllFriendsToTag
};
