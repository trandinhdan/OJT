const postService = require('../services/postService');

const createPost = async (req, res) => {
    try {
        const { user_id, content } = req.body;
        console.log(req.body)

        const imageUrl = req.file ? `/images/${req.file.filename}` : null;
        console.log(imageUrl)
        const postData = {
            user_id,
            content,
            image_url: imageUrl,
        };

        const post = await postService.createPost(postData);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.postId, req.body);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await postService.deletePost(req.params.postId);
        if (post) {
            res.json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostByUserID = async (req, res) => {
    try {
        const posts = await postService.getPostByUserID(req.params.userId);
        if (posts.length > 0) {
            res.json(posts);
        } else {
            res.status(404).json({ message: 'User has no posts' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostByUserID
};
