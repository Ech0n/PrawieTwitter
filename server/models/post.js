const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

// id domyślnie się dodaje
const Post = sequelize.define(
    'Post',
{
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo_path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        posted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }
);

module.exports = Post;