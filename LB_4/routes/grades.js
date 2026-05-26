const express = require("express");
const router = express.Router();

const { Grade, Student, Course } = require("../models");

/**
 * @swagger
 * /grades:
 *   get:
 *     summary: Отримати список оцінок
 *     responses:
 *       200:
 *         description: Список оцінок
 */
router.get("/", async (req, res) => {
    const grades = await Grade.findAll({
        include: [Student, Course]
    });

    res.json(grades);
});

/**
 * @swagger
 * /grades:
 *   post:
 *     summary: Додати нову оцінку
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: integer
 *                 example: 95
 *               comment:
 *                 type: string
 *                 example: Лабораторна робота виконана успішно
 *               StudentId:
 *                 type: integer
 *                 example: 1
 *               CourseId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Оцінку створено
 */
router.post("/", async (req, res) => {
    try {
        const grade = await Grade.create(req.body);
        res.status(201).json(grade);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /grades/{id}:
 *   put:
 *     summary: Оновити оцінку
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
 *               value:
 *                 type: integer
 *                 example: 95
 *               comment:
 *                 type: string
 *                 example: Лабораторна робота виконана успішно
 *               StudentId:
 *                 type: integer
 *                 example: 1
 *               CourseId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Оцінку оновлено
 *       404:
 *         description: Оцінку не знайдено
 */
router.put("/:id", async (req, res) => {
    const grade = await Grade.findByPk(req.params.id);

    if (!grade) {
        return res.status(404).json({ message: "Grade not found" });
    }

    await grade.update(req.body);
    res.json(grade);
});

/**
 * @swagger
 * /grades/{id}:
 *   delete:
 *     summary: Видалити оцінку
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Оцінку видалено
 *       404:
 *         description: Оцінку не знайдено
 */
router.delete("/:id", async (req, res) => {
    const grade = await Grade.findByPk(req.params.id);

    if (!grade) {
        return res.status(404).json({ message: "Grade not found" });
    }

    await grade.destroy();
    res.json({ message: "Grade deleted" });
});

module.exports = router;