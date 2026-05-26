function TaskForm({
  form,
  editingId,
  handleChange,
  handleSubmit,
}) {
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Назва задачі"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Опис задачі"
        value={form.description}
        onChange={handleChange}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Заплановано</option>
        <option>У процесі</option>
        <option>Виконано</option>
      </select>

      <button type="submit">
        {editingId ? "Зберегти зміни" : "Додати задачу"}
      </button>
    </form>
  );
}

export default TaskForm;