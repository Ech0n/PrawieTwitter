const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const Comment = sequelize.define(
    'Comments',
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        likes_count: {              // wartosc aktualizowana przy dodawaniu i usuwaniu like'ow
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        tableName: 'Comments',
        timestamps: true,
        updatedAt: false,
        createdAt: true
    },
);

Comment.associate = (models) => {
    console.log("Associating Comment model...");
    Comment.belongsTo(models.User, {foreignKey: "owner_id"});
    Comment.belongsTo(models.Post, {foreignKey: "post_id"});
};

module.exports = Comment;