const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Задачу не знайдено" });
  }

  res.json(task);
});

app.post("/api/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: "Заповніть усі поля" });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Задачу не знайдено" });
  }

  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: "Заповніть усі поля" });
  }

  task.title = title;
  task.description = description;
  task.status = status;

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskExists = tasks.some((task) => task.id === Number(req.params.id));

  if (!taskExists) {
    return res.status(404).json({ message: "Задачу не знайдено" });
  }

  tasks = tasks.filter((task) => task.id !== Number(req.params.id));

  res.json({ message: "Задачу видалено" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});