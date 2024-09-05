const likeService = require('../services/likeService');

const createLikeForPost = async (req, res) => {
    try {
        const { user, postData } = req.body;
        const like = await likeService.createLikeForPost(user, postData);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createLikeForComment = async (req, res) => {
    try {
        const { user_id, comment_id } = req.body;
        const like = await likeService.createLikeForComment(user_id, comment_id);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllLikes = async (req, res) => {
    try {
        const likes = await likeService.getAllLikes();
        res.status(200).json(likes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLikeForPost = async (req, res) => {
    console.log('delete')
    try {
        const { user_id, post_id } = req.body;
        const like = await likeService.deleteLikeForPost(user_id, post_id);

        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }

        res.status(200).json({ message: "Like deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createLikeForPost,
    createLikeForComment,
    getAllLikes,
    deleteLikeForPost,
};
