const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post('/', messageController.createMessage);
router.get('/', messageController.getAllMessages);

module.exports = router;
