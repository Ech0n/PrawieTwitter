const db = require("../models");
const createComment = async (req, res) => {
    try {
        const post_id = req.params.postID;
        const {content} = req.body;

        if (!req.user){
            return res.status(401).json({ error: "Forbidden, log in." });
        }

        const owner_id = req.user.id;
        const existingPost = await db.Post.findByPk(post_id);
        if(!existingPost){
            return res.status(404).json({ error: "Post not found." });
        }

        await db.Comment.create({
            owner_id,
            content,
            post_id
        });

        return res.status(201).json({
            owner_id,
            post_id,
            content,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateComment = async (req, res) => {
    try{
        const comment_id = req.params.commentID;
        const {content} = req.body;

        const existingComment = await db.Comment.findOne({
            where: { id: comment_id },
        });

        if(!existingComment){
            return res.status(404).json({message: "Comment with selected id not found"});
        }

        await db.Comment.update(
            { content},
            { where: { id: comment_id } }
        );

        const updatedComment = await db.Comment.findOne({
            where: { id: comment_id },
            attributes: { exclude: ['id', "createdAt"] }
        });

        return res.status(200).json(updatedComment);
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}


const deleteComment = async (req, res) => {
    try{
        const comment_id = req.params.commentID;

        const existingComment = await db.Comment.findOne({
            where: { id: comment_id },
        });

        if(!existingComment){
            return res.status(404).json({message: "Comment with selected id not found"});
        }

        await db.Comment.destroy({
            where: { id: comment_id }
        });

        return res.status(200).json({message: "Successfully deleted Comment"});

    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getPostComments = async (req, res) => {
    try{
        const post_id = req.params.postID;

        const comments = await db.Comment.findAll({
            where: { post_id},
            attributes: {
                exclude: ["id"]
            }
        });

        return res.status(200).json(comments);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {createComment, updateComment, deleteComment, getPostComments};