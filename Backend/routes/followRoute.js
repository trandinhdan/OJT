const express = require("express");
const followController = require("../controllers/followController");

const router = express.Router();

router.post('/', followController.createFollow);
router.get('/', followController.getAllFollows);
router.get('/:followId', followController.getFollowById);

router.delete('/:followId', followController.deleteFollow);

module.exports = router;
