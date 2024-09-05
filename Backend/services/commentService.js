const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');
const { createNotification } = require('../services/notificationService');

const createComment = async (comments, posts, user) => {
    const newComemnt = {
        post_id: posts._id,
        user_id: user.userId,
        content: comments,
    }

    const comment = new Comment(newComemnt);
    const commentToDatabase = await comment.save();
    try {
        const post = await Post.findById(posts._id);
        post.comment_id.push(comment._id);
        post.save();
        const user_id = user.userId;
        const fullName = user.fullName;
        const notiData = {
            _id: comment._id,
            content: comment.content,
            post_id: posts._id,
            user_id: { _id: user_id, fullName: fullName },
        }
        createNotification({

            user_id: { _id: user_id, user_id: user_id, fullName },
            type: 'comment',
            ownerUser_id: posts.user_id._id,
            newComment: notiData,
            post_id: { _id: posts._id },
            comment_id: { _id: comment._id },
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
    return commentToDatabase;
};

const getCommentById = async (commentId) => {
    return await Comment.findById(commentId).populate('user_id');
};

const updateComment = async (commentId, commentData) => {
    return await Comment.findByIdAndUpdate(commentId, commentData, { new: true });
};

const deleteComment = async (commentId) => {
    return await Comment.findByIdAndDelete(commentId);
};

const getAllComments = async () => {
    return await Comment.find().populate('user_id').populate('post_id');
};

module.exports = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    getAllComments
};
