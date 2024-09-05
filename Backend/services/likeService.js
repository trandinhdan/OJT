const Like = require('../models/LikeModel');
const Post = require('../models/PostModel');
const { createNotification } = require('../services/notificationService');

const createLikeForPost = async (user, postData) => {
    const existingLike = await Like.findOne({ user_id: user.userId, post_id: postData._id });

    if (existingLike) {
        // Nếu đã tồn tại, xóa like này
        await Like.findByIdAndDelete(existingLike._id);

        // Cập nhật số lượng "like" trong Post
        const post = await Post.findById(postData._id);
        post.like_id.pull(existingLike._id);
        await post.save();

        return null;
    } else {
        // Nếu không tồn tại, tạo một like mới
        const like = new Like({ user_id: user.userId, post_id: postData._id });
        await like.save();
        const user_id = user.userId;
        const fullName = user.fullName;
        createNotification({
            user_id: {user_id, _id: user_id, fullName},
            type: 'like',
            ownerUser_id: postData.user_id._id, 
            post_id: {_id:postData._id}
        });
        // Cập nhật số lượng "like" trong Post
        const post = await Post.findById(postData._id);
        post.like_id.push(like._id);
        await post.save();

        return like;
    }
};

const createLikeForComment = async (userId, commentId) => {
    const like = new Like({ user_id: userId, comment_id: commentId });
    return await like.save();
};

const getLikeById = async (likeId) => {
    return await Like.findById(likeId).populate('user_id').populate('post_id').populate('comment_id');
};

const deleteLike = async (likeId) => {
    return await Like.findByIdAndDelete(likeId);
};

const getAllLikes = async () => {
    return await Like.find().populate('user_id').populate('post_id').populate('comment_id');
};

const deleteLikeForPost = async (userId, postId) => {
    const like = await Like.findOneAndDelete({ user_id: userId, post_id: postId });

    if (like) {
        // Cập nhật số lượng "like" trong Post
        const post = await Post.findById(postId);
        post.like_id.pull(like._id);
        await post.save();

        return like;
    } else {
        return null;
    }
};

module.exports = {
    createLikeForPost,
    createLikeForComment,
    getLikeById,
    deleteLike,
    getAllLikes,
    deleteLikeForPost
};
