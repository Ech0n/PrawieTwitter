const db = require('../models');
const fs = require('fs');

// zwraca ilość polubień konkretnego posta
const getPostLikes = async (req, res) => {
    try {
        const postId = req.params.postID;

        const likes = await db.PostLikes.count({
            where: { post_id: postId }
        });

        return res.status(200).json({"likes": likes});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// jesli post nie ma likea to dodaje, a jak ma to go usuwa
// dodatkowo aktualizuje liczbę polubień w tabeli Post dla posta
const likeUnlikePost = async (req, res) => {
    try {
        const user_id = req.user.id;
        const post_id = req.params.postID;

        console.log("user_id: ", user_id);
        console.log("post_id: ", post_id);

        const existingLike = await db.PostLikes.findOne({
            where: { user_id, post_id }
        });

        if (existingLike) {
            await existingLike.destroy();

            return res.status(200).json({ message: "Post unliked" });
        }

        const newLike = await db.PostLikes.create({
            user_id,
            post_id
        });

        return res.status(201).json({ message: 'Post liked', newLike });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {getPostLikes, likeUnlikePost };