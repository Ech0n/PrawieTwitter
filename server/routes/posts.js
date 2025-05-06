const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const uploadPhoto = require('../middleware/uploadPhoto');
const validateID = require('../middleware/validateID');
const {validationResult, body} = require("express-validator");

const validateOwnerID = [
    body('owner_id').isInt({ min: 1 }).withMessage('owner_id must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        next();
    }
];

/* GET posts listing. */
router.get('/', postsController.getAllPosts);

// specific post routes
router.get('/:postID', validateID, postsController.getPost);

router.post('/', validateOwnerID, uploadPhoto.single('photo'), postsController.createPost);

router.delete('/:postID', validateID, postsController.deletePost);

router.put('/:postID', validateID, uploadPhoto.single('photo'), postsController.updatePost);



module.exports = router;
