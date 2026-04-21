import './TaskFilter.css'

function TaskFilter() {
  return (
    <div className="task-filter">
      <button className="task-filter-btn task-filter-btn-pending">Pending</button>
      <button className="task-filter-btn task-filter-btn-in-progress">In progress</button>
      <button className="task-filter-btn task-filter-btn-done">Done</button>
    </div>
  )
}

export default TaskFilter
