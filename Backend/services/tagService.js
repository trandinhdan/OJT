const Tag = require('../models/TagModel');
const { UserPostTag } = require('../models/TagModel');
const { createNotification } = require('../services/notificationService');

const createTag = async (tagData) => {
    const newTag = new UserPostTag({
        post_id: tagData.post_id,
        user_id: tagData.user_id,
        tagged_by: tagData.tagged_by.userId
    });

    createNotification({
        user_id: { user_id: tagData.tagged_by.userId, _id: tagData.tagged_by.userId, fullName: tagData.tagged_by.fullName },
        type: 'tag',
        ownerUser_id: tagData.user_id,
        post_id: { _id: tagData.post_id }
    });
    return await newTag.save();
};

const getTagById = async (tagId) => {
    return await Tag.findById(tagId);
};

const updateTag = async (tagId, tagData) => {
    return await Tag.findByIdAndUpdate(tagId, tagData, { new: true });
};

const deleteTag = async (tagId) => {
    return await Tag.findByIdAndDelete(tagId);
};

const getAllTags = async () => {
    return await Tag.find();
};

const addTagToPost = async (postId, tagId) => {
    const postTag = new PostTag({ post_id: postId, tag_id: tagId });
    return await postTag.save();
};

const addTagToUser = async (userId, tagId) => {
    const userTag = new UserTag({ user_id: userId, tag_id: tagId });
    return await userTag.save();
};

module.exports = {
    createTag,
    getTagById,
    updateTag,
    deleteTag,
    getAllTags,
    addTagToPost,
    addTagToUser
};
