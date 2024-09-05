const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment_id: {
        type: [{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' }],
        default: []
    },
    like_id: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }],
        default: []
    },
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: ''
    }, 
    isHidden: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
