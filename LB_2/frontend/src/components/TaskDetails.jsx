function TaskDetails({ selectedTask }) {
  return (
    <section className="details">
      <h2>Деталі задачі</h2>

      <p>
        <b>Назва:</b> {selectedTask.title}
      </p>

      <p>
        <b>Опис:</b> {selectedTask.description}
      </p>

      <p>
        <b>Статус:</b> {selectedTask.status}
      </p>
    </section>
  );
}

export default TaskDetails;