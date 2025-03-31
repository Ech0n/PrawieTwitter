const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

// id domyślnie się dodaje
const User = sequelize.define(
    'User',
{
        given_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

module.exports = User;