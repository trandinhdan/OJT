const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userPostTagSchema = new Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tagged_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const postTagSchema = new Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
});

const userTagSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
});

const Tag = mongoose.model("Tag", tagSchema);
const PostTag = mongoose.model("PostTag", postTagSchema);
const UserTag = mongoose.model("UserTag", userTagSchema);
const UserPostTag = mongoose.model("UserPostTag", userPostTagSchema);

module.exports = { Tag, PostTag, UserTag, UserPostTag };
