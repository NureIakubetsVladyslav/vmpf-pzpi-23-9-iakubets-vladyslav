const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Grade = sequelize.define("Grade", {
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Grade;