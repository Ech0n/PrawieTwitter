const express = require('express');
const commentsController = require("../controllers/commentsController");
const router = express.Router();

// Get Post Comments
router.get('/:postId', commentsController.getPostComments);

// Create Comment
router.post('/:postId', commentsController.createComment);

// Delete Comment
router.delete('/:commentID', commentsController.deleteComment);

// Update Comment
router.put('/:commentID', commentsController.updateComment);

module.exports = router;