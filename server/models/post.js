const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

// ID by default
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
        }
    },{
        tableName: 'Posts',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    }
);

Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: "owner_id" });
    Post.hasMany(models.Comment, { foreignKey: "post_id" });
};

module.exports = Post;