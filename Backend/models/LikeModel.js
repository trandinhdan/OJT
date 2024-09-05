const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Like", likeSchema);
