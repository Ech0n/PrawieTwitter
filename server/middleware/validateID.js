const { param, validationResult } = require('express-validator');

const validateId = [
    param('userID').optional().isInt({ min: 1 }).withMessage('UserID must be a positive integer'),
    param('postID').optional().isInt({ min: 1 }).withMessage('PostID must be a positive integer'),
    param('commentID').optional().isInt({ min: 1 }).withMessage('CommentID must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        next();
    }
];

module.exports = validateId