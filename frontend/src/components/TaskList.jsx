import TaskCard from './TaskCard'
import './TaskList.css'

function TaskList({ tasks, isLoading, error, onDelete, onEdit }) {
  if (isLoading) return <p className="task-list-feedback">Loading tasks...</p>
  if (error) return <p className="task-list-feedback task-list-feedback-error">{error}</p>
  if (tasks.length === 0) return <p className="task-list-feedback">No tasks found.</p>

  return (
    <section className="task-list-container">
      <ul className="list-unstyled task-list-grid">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} onDelete={onDelete} onEdit={onEdit} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TaskList
