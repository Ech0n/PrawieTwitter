const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

// ID is added by default
const User = sequelize.define(
    'User',
{
        name: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        followers_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        following_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },{
        tableName: 'Users',
        timestamps: true,
        updatedAt: false,
        createdAt: true
    }
);

User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: "owner_id" });
    User.hasMany(models.Report, { foreignKey: "reporter_id" });
    User.hasMany(models.Comment, { foreignKey: "owner_id" });

    // Many-To_Many relationship
    User.belongsToMany(User, {
        through: models.Followers,
        as: 'UserFollowers', // Alias dla użytkowników, którzy obserwują danego użytkownika
        foreignKey: 'following_id',
        otherKey: 'follower_id',
    });

    User.belongsToMany(User, {
        through: models.Followers,
        as: 'UserFollowing', // Alias dla użytkowników, których dany użytkownik obserwuje
        foreignKey: 'follower_id',
        otherKey: 'following_id',
    });
};

module.exports = User;