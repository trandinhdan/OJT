const Follow = require('../models/FollowModel');

const createFollow = async (followData) => {
    const follow = new Follow(followData);
    return await follow.save();
};

const getFollowById = async (followId) => {
    return await Follow.findById(followId).populate('follower_id').populate('followee_id');
};

const deleteFollow = async (followId) => {
    return await Follow.findByIdAndDelete(followId);
};

const getAllFollows = async () => {
    return await Follow.find().populate('follower_id').populate('followee_id');
};

module.exports = {
    createFollow,
    getFollowById,
    deleteFollow,
    getAllFollows
};
