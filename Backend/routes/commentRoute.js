const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);

router.get('/:commentId', commentController.getCommentById);

router.put('/:commentId', commentController.updateComment);

router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
