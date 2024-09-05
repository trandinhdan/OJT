const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post('/post', likeController.createLikeForPost);
router.post('/comment', likeController.createLikeForComment);
router.get('', likeController.getAllLikes);
router.delete('/post', likeController.deleteLikeForPost); // Thêm endpoint xóa "like" cho bài post

module.exports = router;
