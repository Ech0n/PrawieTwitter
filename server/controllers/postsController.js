const db = require('../models');
// const upload = require('../middleware/uploadPhoto');
const fs = require('fs');

// zwraca wszystkie posty, lub posty konkretnego użytkownika
// w zależności od tego czy ownerId jest podany w zapytaniu
const getAllPosts = async (req, res) => {
    try {
        const { ownerId } = req.body;

        if (ownerId) {
            const posts = await db.Post.findAll({
                where: { owner_id: ownerId }
            });

            if (!posts) {
                return res.status(404).json({ error: 'No posts found' });
            }

            return res.status(200).json(posts);
        } else {
            const posts = await db.Post.findAll();
            return res.status(200).json({ posts });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPost = async (req, res, sortOption) => {
    try {
        const postId = req.params.postId;

        const existingPost = await db.Post.findOne({
            where: { id: postId }
        });

        if(!existingPost){
            return res.status(200).json({message: "Post with selected id not found"});
        }

        return res.status(200).json(existingPost);
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}


const createPost = async (req, res) => {
    try {
        const { owner_id, content } = req.body;
        const photo_path = req.file ? req.file.path : null;

        const newPost = await db.Post.create({
            owner_id,
            content,
            photo_path
        });

        return res.status(201).json({message: 'Post created', newPost });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const deletePost = async (req, res) => {
    try{
        const postId = req.params.postId;

        const existingPost = await db.Post.findOne({
            where: { id: postId }
        });

        if(!existingPost){
            return res.status(200).json({message: "Post with selected id not found"});
        }

        // usuwanie zdjecia jesli post je mial
        if (existingPost.photo_path) {
            console.log(existingPost.photo_path);
            const filePath = existingPost.photo_path; 


            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); 
                console.log(`File ${filePath} deleted successfully.`);
            } else {
                console.log(`File ${filePath} not found.`);
            }
        }

        await db.Post.destroy({
            where: { id: postId }
        });

        return res.status(200).json({message: "Successfully deleted Post"});
    } catch (error){
        return res.status(500).json({ error: error.message });
    }
}


const updatePost = async (req, res) => {
    try{
        const postId = req.params.postId;
        const { content, photo_path } = req.body;

        const existingPost = await db.Post.findOne({
            where: { id: postId },
        });

        if(!existingPost){
            return res.status(404).json({message: "Post with selected id not found"});
        }

        await db.User.update(
            { content, photo_path },
            { where: { id: postId } }
        );

        const updatedPost = await db.User.findOne({
            where: { id: postId },
        });

        return res.status(200).json(updatedPost);
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}



module.exports = {getAllPosts, getPost, createPost, deletePost, updatePost};