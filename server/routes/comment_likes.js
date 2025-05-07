const express = require('express');
const commentsLikesController = require("../controllers/comment_likesController");
const router = express.Router();
const validateID = require("../middleware/validateID")

// Get comment likes
router.get('/:commentID', validateID, commentsLikesController.getCommentLikes);

// like/unlike comment
router.post('/:commentID',  validateID, commentsLikesController.likeUnlikeComment);

module.exports = router;