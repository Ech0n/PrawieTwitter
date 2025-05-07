const express = require('express');
const commentsController = require("../controllers/commentsController");
const router = express.Router();
const validateID = require("../middleware/validateID")

// Get Post Comments
router.get('/:postID', commentsController.getPostComments);

// Create Comment
router.post('/:postID', commentsController.createComment);

// Delete Comment
router.delete('/:commentID', validateID, commentsController.deleteComment);

// Update Comment
router.put('/:commentID', validateID, commentsController.updateComment);

module.exports = router;