const express = require('express');
const postLikesController = require("../controllers/post_likesController");
const router = express.Router();
const validateID = require("../middleware/validateID")

// Get post likes
router.get('/:postID', postLikesController.getPostLikes);

router.get('/status/:postID', postLikesController.getPostLikesOfUser);

// like/unlike post
router.post('/:postID', postLikesController.likeUnlikePost);

module.exports = router;