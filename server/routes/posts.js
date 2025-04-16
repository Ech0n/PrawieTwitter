const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const uploadPhoto = require('../middleware/uploadPhoto');

/* GET posts listing. */
router.get('/', postsController.getAllPosts);

// specific post routes
router.get('/:postId', postsController.getPost);

router.post('/', uploadPhoto.single('photo'), postsController.createPost);

router.delete('/:postId', postsController.deletePost);

router.put('/:postId', uploadPhoto.single('photo'), postsController.updatePost);



module.exports = router;
