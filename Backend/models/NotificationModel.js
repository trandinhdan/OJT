const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    ownerUser_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // like, comment, follow, etc.
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
});

module.exports = mongoose.model("Notification", notificationSchema);
