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
    Followers,
    Comment,
    Report,
    reportID_to_name
}

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Synchronization
sequelize.sync({ alter: false }).then(async () => {
    console.log('Database & tables created!');
});

module.exports = db;