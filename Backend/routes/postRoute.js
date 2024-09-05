const express = require("express");
const postController = require("../controllers/postController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post('/', upload.single("image_url"), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);

router.put('/:postId', postController.updatePost);

router.post('/update', postController.updatePost);

router.get('/user/:userId', postController.getPostByUserID);

router.delete('/:postId', postController.deletePost);

module.exports = router;
