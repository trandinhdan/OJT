const Post = require('../models/PostModel');

const createPost = async (postData) => {
    const post = new Post(postData);
    return await post.save();
};

const getPostById = async (postId) => {
    return await Post.findById(postId).populate('user_id').populate({
        path: 'like_id',
        populate: {
            path: 'user_id',
            select: 'fullName'
        }
    }).populate({
        path: 'comment_id',
        populate: {
            path: 'user_id',
            select: 'fullName'
        }
    });
};

const updatePost = async (postId, postData) => {
    return await Post.findByIdAndUpdate(postId, postData, { new: true });
};

const deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
};

const getAllPosts = async () => {
    return await Post.find()
        .populate('user_id', 'fullName')
        .populate({
            path: 'like_id',
            populate: {
                path: 'user_id',
                select: 'fullName'
            }
        })
        .populate({
            path: 'comment_id',
            populate: {
                path: 'user_id',
                select: 'fullName'
            }
        })
};

const getPostByUserID = async (userId) => {
    const posts = await Post.find({ user_id: userId }).populate('user_id', 'fullName')
        .populate({
            path: 'like_id',
            populate: {
                path: 'user_id',
                select: 'fullName'
            }
        })
        .populate({
            path: 'comment_id',
            populate: {
                path: 'user_id',
                select: 'fullName'
            }
        });
    return posts;
};


module.exports = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getAllPosts,
    getPostByUserID
};
