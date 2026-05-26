const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lesson = sequelize.define("Lesson", {
    topic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lessonDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Lesson;