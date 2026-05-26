import TaskDetails from "./TaskDetails";

function TaskItem({
  task,
  selectedTask,
  handleDetails,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="task-wrapper">
      <article className="task-item">
        <div>
          <h2>{task.title}</h2>
          <span>{task.status}</span>
        </div>

        <div className="actions">
          <button onClick={() => handleDetails(task.id)}>
            Деталі
          </button>

          <button onClick={() => handleEdit(task)}>
            Редагувати
          </button>

          <button onClick={() => handleDelete(task.id)}>
            Видалити
          </button>
        </div>
      </article>

      {selectedTask && selectedTask.id === task.id && (
        <TaskDetails selectedTask={selectedTask} />
      )}
    </div>
  );
}

export default TaskItem;