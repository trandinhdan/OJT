const tagService = require('../services/tagService');

const createTag = async (req, res) => {
    try {
        console.log(req.body)
        const tag = await tagService.createTag(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tags = await tagService.getAllTags();
        res.json(tags);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTagById = async (req, res) => {
    try {
        const tag = await tagService.getTagById(req.params.id);
        if (tag) {
            res.json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTag = async (req, res) => {
    try {
        const tag = await tagService.updateTag(req.params.id, req.body);
        if (tag) {
            res.json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await tagService.deleteTag(req.params.id);
        if (tag) {
            res.json({ message: 'Tag deleted' });
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addTagToPost = async (req, res) => {
    try {
        const postTag = await tagService.addTagToPost(req.body.post_id, req.body.tag_id);
        res.status(201).json(postTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addTagToUser = async (req, res) => {
    try {
        const userTag = await tagService.addTagToUser(req.body.user_id, req.body.tag_id);
        res.status(201).json(userTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    updateTag,  
    deleteTag,
    addTagToPost,
    addTagToUser
};
