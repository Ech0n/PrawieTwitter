const db = require('../models');
const fs = require('fs');


// zwraca ilość polubień konkretnego komentarza
const getCommentLikes = async (req, res) => {
    try {
        const commentId = req.params.commentID;

        const likes = await db.CommentLikes.count({
            where: { comment_id: commentId }
        });

        return res.status(200).json({"likes": likes});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// jesli komentarz nie ma likea to dodaje, a jak ma to go usuwa
const likeUnlikeComment = async (req, res) => {
    try {
        const user_id = req.user.id;
        const comment_id = req.params.commentID;

        const existingLike = await db.CommentLikes.findOne({
            where: { user_id, comment_id }
        });

        if (existingLike) {
            await existingLike.destroy();

            return res.status(200).json({ message: "Comment unliked" });
        }

        const newLike = await db.CommentLikes.create({
            user_id,
            comment_id
        });

        return res.status(201).json({ message: 'Comment liked', newLike });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getCommentLikes, likeUnlikeComment };