const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const CommentLikes = sequelize.define(
    'CommentLikes',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'CommentLikes',
        timestamps: true,
        updatedAt: false,
        createdAt: true
    },
);

CommentLikes.associate = (models) => {
    CommentLikes.belongsTo(models.User, {foreignKey: "user_id"});
    CommentLikes.belongsTo(models.Comment, {foreignKey: "comment_id"});
}

module.exports = CommentLikes;