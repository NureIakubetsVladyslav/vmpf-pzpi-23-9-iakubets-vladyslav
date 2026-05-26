const express = require("express");
const router = express.Router();

const { Student } = require("../models");

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Отримати список студентів
 *     responses:
 *       200:
 *         description: Список студентів
 */
router.get("/", async (req, res) => {
    const students = await Student.findAll();
    res.json(students);
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Отримати студента за ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Дані студента
 *       404:
 *         description: Студента не знайдено
 */
router.get("/:id", async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Додати нового студента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Владислав
 *               lastName:
 *                 type: string
 *                 example: Якубець
 *               groupName:
 *                 type: string
 *                 example: ПЗПІ-23-9
 *               email:
 *                 type: string
 *                 example: vladyslav.yakubets@example.com
 *     responses:
 *       201:
 *         description: Студента створено
 */
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Оновити студента
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
 *               firstName:
 *                 type: string
 *                 example: Владислав
 *               lastName:
 *                 type: string
 *                 example: Якубець
 *               groupName:
 *                 type: string
 *                 example: ПЗПІ-23-9
 *               email:
 *                 type: string
 *                 example: vladyslav.yakubets@example.com
 *     responses:
 *       200:
 *         description: Студента оновлено
 *       404:
 *         description: Студента не знайдено
 */
router.put("/:id", async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    await student.update(req.body);
    res.json(student);
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Видалити студента
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Студента видалено
 *       404:
 *         description: Студента не знайдено
 */
router.delete("/:id", async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();
    res.json({ message: "Student deleted" });
});

module.exports = router;