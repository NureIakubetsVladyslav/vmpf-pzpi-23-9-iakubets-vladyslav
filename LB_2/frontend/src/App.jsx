import { useEffect, useState } from "react";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

const API_URL = "http://localhost:3000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Заплановано",
  });

  const [editingId, setEditingId] = useState(null);

  const loadTasks = async () => {
    const response = await fetch(API_URL);

    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setEditingId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }

    setForm({
      title: "",
      description: "",
      status: "Заплановано",
    });

    setSelectedTask(null);

    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingId(task.id);

    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }

    loadTasks();
  };

  const handleDetails = async (id) => {
    if (selectedTask?.id === id) {
      setSelectedTask(null);
      return;
    }

    const response = await fetch(`${API_URL}/${id}`);

    const data = await response.json();

    setSelectedTask(data);
  };

  return (
    <main className="app">
      <section className="card">
        <h1>Менеджер задач</h1>

        <TaskForm
          form={form}
          editingId={editingId}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              selectedTask={selectedTask}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;