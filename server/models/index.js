const sequelize = require('../database/config');

const User = require('./user');
const Post = require('./post');
const Followers = require('./followers');
const Comment = require('./comment');
const Report = require('./report');

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
    .then(() => console.log("DB sync OK"))
    .catch((err) => console.error("DB sync error:", err));

module.exports = db;