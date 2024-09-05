const Message = require('../models/MessageModel');

const createMessage = async (messageData) => {
    const message = new Message(messageData);
    return await message.save();
};

const getMessageById = async (messageId) => {
    return await Message.findById(messageId).populate('sender_id').populate('receiver_id');
};

const deleteMessage = async (messageId) => {
    return await Message.findByIdAndDelete(messageId);
};

const getAllMessages = async () => {
    return await Message.find().populate('sender_id').populate('receiver_id');
};

module.exports = {
    createMessage,
    getMessageById,
    deleteMessage,
    getAllMessages
};
