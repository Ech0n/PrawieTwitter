const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const PostLikes = sequelize.define(
    'PostLikes',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'PostLikes',
        timestamps: true,
        updatedAt: false,
        createdAt: true
    },
);

PostLikes.associate = (models) => {
    PostLikes.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    PostLikes.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });
  };

module.exports = PostLikes;