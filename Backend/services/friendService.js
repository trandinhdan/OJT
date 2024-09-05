const Friend = require('../models/FriendModel');
const { createNotification } = require('../services/notificationService');

const getFriendRequestsSentByUserId = async (userId) => {
    return await Friend.find({ user_id: userId, status: 'requested' });
};

const getFriendRequestsByUserId = async (userId) => {
    return await Friend.find({ friend_id: userId, status: 'requested' }).populate('user_id').populate('friend_id');
};

const friendCheckStatus = async (friendData) => {
    return await Friend.findOne({ $and: [{ user_id: friendData.user_id }, { friend_id: friendData.friend_id }] });
};

const createFriendRequest = async (friendData) => {
    // console.log("friendData: ", friendData)
    const friend = {
        user_id: friendData.user_id,
        friend_id: friendData.friend_id
    }
    // console.log(friend)
    const isRequestExist = await isFriendRequestExists(friend);
    if (isRequestExist) {
        throw new Error('Friend request already exists');
    }
    createNotification({
        user_id: { user_id: friendData.user_id, _id: friendData.user_id, fullName: friendData.user_fullName },
        type: 'friend_request',
        ownerUser_id: friendData.friend_id
    });
    const friendRequest = new Friend(friend);
    return await friendRequest.save();
};

const deleteFriendRequest = async (friendData) => {
    // console.log(friendData)
    return await Friend.findOneAndDelete({ $and: [{ user_id: friendData.user_id }, { friend_id: friendData.friend_id }] });
};

const getFriendById = async (friendId) => {
    return await Friend.findById(friendId).populate('user_id').populate('friend_id');
};

const updateFriendStatus = async (friendData) => {
    if (friendData.status === 'accepted') {
        createNotification({
            user_id: { user_id: friendData.friend_id, _id: friendData.friend_id, fullName: friendData.friend_fullName },
            type: 'accepted_friend_request',
            ownerUser_id: friendData.user_id
        });
    }
    return await Friend.findOneAndUpdate({ $and: [{ user_id: friendData.user_id }, { friend_id: friendData.friend_id }] }, { status: friendData.status });
};

const deleteFriend = async (friendData) => {
    const { user_id, friend_id } = friendData;
    try {
        const deletedFriend = await Friend.findOneAndDelete({
            $or: [
                { $and: [{ user_id: user_id }, { friend_id: friend_id }] },
                { $and: [{ user_id: friend_id }, { friend_id: user_id }] }
            ]
        });
        if (!deletedFriend) {
            throw new Error(`Friend relationship not found for user_id ${user_id} and friend_id ${friend_id}`);
        }
        return deletedFriend;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error;
    }
};


const getAllFriends = async () => {
    return await Friend.find().populate('user_id').populate('friend_id');
};

const getAllFriendsWithUserId = async (userId) => {
    return await Friend.find({ $or: [{ user_id: userId }, { friend_id: userId }] }).populate('user_id').populate('friend_id');
};

const getAllFriendsByUserId = async (friendId) => {
    try {
        const friend = await Friend.find({ $and: [{ friend_id: friendId }, { status: 'accepted' }] }).populate({
            path: 'user_id',
            select: '-password -username -email -role -createdAt -updatedAt -__v',

        });
        return friend;
    } catch (error) {
    }
};

const getAllFriendsToTag = async (userId) => {
    try {
        const friends = await Friend.find({
            $and: [
                { status: 'accepted' },
                { $or: [{ user_id: userId }, { friend_id: userId }] }
            ]
        }).populate({
            path: 'user_id',
            select: 'fullName _id',
        }).populate({
            path: 'friend_id',
            select: 'fullName _id',
        });
        return friends;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};


const isFriendRequestExists = async (friendData) => {
    const user_id = friendData.user_id;
    const friend_id = friendData.friend_id;
    return await Friend.findOne({
        $or: [
            { $and: [{ user_id: user_id }, { friend_id: friend_id }] },
            { $and: [{ user_id: friend_id }, { friend_id: user_id }] }
        ]
    });
};


module.exports = {
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
