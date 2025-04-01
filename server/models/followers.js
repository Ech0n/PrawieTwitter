const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const Followers = sequelize.define(
    'Followers',
    {
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        following_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'Followers',
        timestamps: true,
        updatedAt: false,
        createdAt: true
    },
);

module.exports = Followers;