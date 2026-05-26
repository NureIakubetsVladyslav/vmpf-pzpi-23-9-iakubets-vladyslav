const sequelize = require("./config/database");
const { Student, Teacher, Course, Lesson, Grade } = require("./models");

async function seedDatabase() {
    await sequelize.sync({ force: true });

    const teacher = await Teacher.create({
        firstName: "Олександр",
        lastName: "Іваненко",
        department: "Кафедра програмування"
    });

    const student = await Student.create({
        firstName: "Владислав",
        lastName: "Якубець",
        groupName: "ПЗПІ-23-9",
        email: "vladyslav.yakubets@example.com"
    });

    const course = await Course.create({
        title: "Високорівневі мови програмування та фреймворки",
        credits: 4,
        TeacherId: teacher.id
    });

    await Lesson.create({
        topic: "Робота з ORM та базою даних",
        lessonDate: "2026-05-26",
        room: "Аудиторія 305",
        CourseId: course.id
    });

    await Grade.create({
        value: 95,
        comment: "Лабораторна робота виконана успішно",
        StudentId: student.id,
        CourseId: course.id
    });

    console.log("Test data added successfully");
}

seedDatabase();