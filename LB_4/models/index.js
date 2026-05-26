const Student = require("./Student");
const Teacher = require("./Teacher");
const Course = require("./Course");
const Lesson = require("./Lesson");
const Grade = require("./Grade");

Teacher.hasMany(Course);
Course.belongsTo(Teacher);

Course.hasMany(Lesson);
Lesson.belongsTo(Course);

Student.hasMany(Grade);
Grade.belongsTo(Student);

Course.hasMany(Grade);
Grade.belongsTo(Course);

module.exports = {
    Student,
    Teacher,
    Course,
    Lesson,
    Grade
};