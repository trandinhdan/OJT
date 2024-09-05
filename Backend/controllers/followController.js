const followService = require('../services/followService');

const createFollow = async (req, res) => {
    try {
        const follower_id = req.body.follower_id;
        const followee = req.body.followee_id;
        if(follower_id === followee) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }
        const follow = await followService.createFollow(req.body);
        res.status(201).json(follow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFollows = async (req, res) => {
    try {
        const follows = await followService.getAllFollows();
        res.json(follows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFollowById = async (req, res) => {
    try {
        const follow = await followService.getFollowById(req.params.followId);
        if (follow) {
            res.json(follow);
        } else {
            res.status(404).json({ message: 'Follow not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFollow = async (req, res) => {
    try {
        const follow = await followService.deleteFollow(req.params.followId);
        if (follow) {
            res.json({ message: 'Follow deleted' });
        } else {
            res.status(404).json({ message: 'Follow not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createFollow,
    getAllFollows,
    getFollowById,
    deleteFollow
};
