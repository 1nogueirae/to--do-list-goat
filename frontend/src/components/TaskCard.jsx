import './TaskCard.css'

const getBadgeClass = (status) => {
    const map = {
        pending: 'task-badge task-badge-pending',
        in_progress: 'task-badge task-badge-in-progress',
        done: 'task-badge task-badge-done',
    }
    return map[status] ?? 'task-badge task-badge-pending'
}

const getStatusLabel = (status) => {
    const map = {
        pending: 'Pending',
        in_progress: 'In progress',
        done: 'Done',
    }
    return map[status] ?? status
}

function TaskCard({ task, onDelete, onEdit, onComplete }) {
    return (
        <article className="task-card">
            <div className="task-card-header">
                <div>
                    <small className="task-id">Task #{task.id}</small>
                    <h3 className="task-title">{task.title}</h3>
                </div>

                <div className="task-card-actions">
                    <span className={getBadgeClass(task.status)}>
                        {getStatusLabel(task.status)}
                    </span>
                    {task.status !== 'done' && (
                        <>
                            <button type="button" className="task-complete-btn" onClick={() => onComplete(task.id)}>
                                <i className="bi bi-check-lg"></i>
                            </button>
                        </>
                    )}
                    <button type="button" className="task-edit-btn" onClick={() => onEdit(task)}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button type="button" className="task-delete-btn" onClick={() => { if (window.confirm('Delete this task?')) onDelete(task.id) }}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            {task.description && (
                <div className="task-card-body">
                    <p className="task-description">{task.description}</p>
                </div>
            )}
        </article>
    )
}

export default TaskCard