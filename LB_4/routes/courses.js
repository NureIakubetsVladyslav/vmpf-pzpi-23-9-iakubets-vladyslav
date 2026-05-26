const express = require("express");
const router = express.Router();

const { Course, Teacher } = require("../models");

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Отримати список курсів
 *     responses:
 *       200:
 *         description: Список курсів
 */
router.get("/", async (req, res) => {
    const courses = await Course.findAll({
        include: Teacher
    });

    res.json(courses);
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Додати новий курс
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Високорівневі мови програмування та фреймворки
 *               credits:
 *                 type: integer
 *                 example: 4
 *               TeacherId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Курс створено
 */
router.post("/", async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Оновити курс
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Високорівневі мови програмування та фреймворки
 *               credits:
 *                 type: integer
 *                 example: 4
 *               TeacherId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Курс оновлено
 *       404:
 *         description: Курс не знайдено
 */
router.put("/:id", async (req, res) => {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    await course.update(req.body);
    res.json(course);
});

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Видалити курс
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Курс видалено
 *       404:
 *         description: Курс не знайдено
 */
router.delete("/:id", async (req, res) => {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();
    res.json({ message: "Course deleted" });
});

module.exports = router;