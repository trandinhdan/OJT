const commentService = require('../services/commentService');

const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(req.body.comment, req.body.post, req.body.user);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCommentById = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await commentService.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const updatedComment = await commentService.updateComment(req.params.commentId, req.body);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const deletedComment = await commentService.deleteComment(req.params.commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
};
