const messageService = require('../services/messageService');

const createMessage = async (req, res) => {
    try {
        const message = await messageService.createMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMessageById = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.id);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const message = await messageService.deleteMessage(req.params.id);
        if (message) {
            res.json({ message: 'Message deleted' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
};
