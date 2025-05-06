const db = require("../models");

const getUserFollowers = async (req, res) => {
    try {
        const userID = req.params.userID;
        const existingUser = await db.User.findByPk(userID);
        if (!existingUser){
            return res.status(404).json({message: "User not found"})
        }

        const followers = await db.Followers.findAll({
            where: {
                following_id: userID
            }, include: [{
                model: db.User,
                as: "FollowerUser",
                attributes: [
                    "username"
                ]
            }]
        });
        const usernames = followers.map(f => f.FollowerUser.username);
        return res.status(200).json({followers: usernames});
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getUserFollowing = async (req, res) => {
    try {
        const userID = req.params.userID;
        const existingUser = await db.User.findByPk(userID);
        if (!existingUser){
            return res.status(404).json({message: "User not found"})
        }
        const following = await db.Followers.findAll({
            where: {
                follower_id: userID
            }, include: [{
                model: db.User,
                as: "FollowingUser",
                attributes: [
                    "username"
                ]
            }]
        });
        // Mozna ewentualnie cos więcej zwracać, póki co same username
        const usernames = following.map(f => f.FollowingUser.username);
        return res.status(200).json({following: usernames});
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createFollow = async (req, res) => {
    try {
        const userID = Number(req.params.userID);

        if (!req.user){
            return res.status(401).json({ error: "Forbidden, log in." });
        }

        const followerID = req.user.id;

        const exitingFollow =  await db.Followers.findOne({
            where: {
                follower_id: followerID,
                following_id: userID
            }
        })

        if (exitingFollow) {
            return res.status(409).json({ error: "Follow already exists." });
        }

        await db.Followers.create({
            follower_id: followerID,
            following_id: userID
        })

        return res.status(201).json({message: "Succesfully created folllow"});
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteFollow = async (req, res) => {
    try {
        const userID = req.params.userID;

        if (!req.user){
            return res.status(401).json({ error: "Forbidden, log in." });
        }

        const followerID = req.user.id;

        const existingFollow = await db.Followers.findOne({
            where: {
                follower_id: followerID,
                following_id: userID
            },
        });

        if(!existingFollow){
            return res.status(404).json({message: "No follow found"});
        }

        await existingFollow.destroy()

        return res.status(200).json({message: "Successfully deleted follow"});
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUserFollowing,
    getUserFollowers,
    createFollow,
    deleteFollow
}