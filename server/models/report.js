const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const Report = sequelize.define(
    'Comment',
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reporter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        report_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        report_content: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: 'Reports',
        timestamps: true,
        updatedAt: false,
        createdAt: true
    }
);

Report.associate = (models) => {
    Report.belongsTo(models.User, {foreignKey: "reporter_id"});
    Report.belongsTo(models.Post, {foreignKey: "post_id"});
};

module.exports = Report;