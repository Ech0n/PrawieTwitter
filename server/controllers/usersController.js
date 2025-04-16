const db = require('../models');

const getAllUser = async (req, res, sortOption) => {
    try {
        const users = await db.User.findAll();

        return res.status(200).json({ users});
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res, sortOption) => {
    try {
        const userId = req.params.userId;

        const existingUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password_hash', "id"]}
        });

        if(!existingUser){
            return res.status(200).json({message: "User with selected id not found"});
        }

        return res.status(200).json(existingUser);
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.userId;

        const existingUser = await db.User.findOne({
            where: { id: userId }
        });

        if(!existingUser){
            return res.status(200).json({message: "User with selected id not found"});
        }

        await db.User.destroy({
            where: { id: userId }
        });

        return res.status(200).json({message: "Successfully deleted User"});
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.params.userId;
        const { name, username, surname, description} = req.body;

        const existingUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password_hash', 'id']}
        });

        if(!existingUser){
            return res.status(404).json({message: "User with selected id not found"});
        }

        await db.User.update(
            { name, surname, username, description},
            { where: { id: userId } }
        );

        const updatedUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password_hash', 'id'] }
        });

        return res.status(200).json(updatedUser);
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {getAllUser, getUser, deleteUser, updateUser};