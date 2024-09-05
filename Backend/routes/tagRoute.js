const express = require("express");
const tagController = require("../controllers/tagController");

const router = express.Router();

router.post('/', tagController.createTag);
router.get('/', tagController.getAllTags);

module.exports = router;
