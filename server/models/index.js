const sequelize = require('../database/config');

const User = require('./user');
const Post = require('./post');
const Followers = require('./followers');
const Comment = require('./comment');
const Report = require('./report');
const PostLikes = require('./post_likes');
const CommentLikes = require('./comment_likes');
const seedUsers = require("../database/seeders/users-seed");
const seedComments = require("../database/seeders/comments-seed");
const seedPosts = require("../database/seeders/posts-seed");
const seedPostLikes = require("../database/seeders/posts-likes-seed");
const seedFollowers = require("../database/seeders/followers-seed");
const seedCommentLikes = require("../database/seeders/comments-likes-seed");

const reportID_to_name = {
    0 : "spam",
    1 : "hate",
    2 : "fake",
    3 : "other"
}

const db = {
    sequelize,
    User,
    Post,
    Comment,
    Followers,
    Report,
    PostLikes,
    CommentLikes,
    reportID_to_name
}

if (!process.env.VITEST) {
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
}

// Synchronization
sequelize.sync({force: false })
    .then(async () => {
        await seedUsers();
        await seedPosts();
        await seedComments();
        await seedPostLikes();
        await seedFollowers();
        await seedCommentLikes();
        console.log("DB sync OK")

    })
    .catch((err) => console.error("DB sync error:", err));

module.exports = db;