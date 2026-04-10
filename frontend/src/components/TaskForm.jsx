import { useEffect, useState } from 'react'
import './TaskForm.css'

const API_URL = 'http://localhost:3000/api/tasks'

function TaskForm({ onTaskCreated, onTaskUpdated, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description ?? '')
      setStatus(editingTask.status)
      return
    }

    setTitle('')
    setDescription('')
    setStatus('pending')
  }, [editingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (editingTask) {
        await onTaskUpdated(editingTask.id, { title, description, status })
        return
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status }),
      })

      if (!response.ok) throw new Error('Could not create task.')

      setTitle('')
      setDescription('')
      setStatus('pending')
      onTaskCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="task-form-container">
      <h2 className="task-form-title">{editingTask ? 'Edit task' : 'New task'}</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="task-form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </div>

        <div className="task-form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            rows={3}
          />
        </div>

        <div className="task-form-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {error && <p className="task-form-error">{error}</p>}

        <div className="task-form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (editingTask ? 'Saving...' : 'Creating...') : (editingTask ? 'Save changes' : 'Create task')}
          </button>

          {editingTask && (
            <button
              type="button"
              className="task-form-cancel-btn"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default TaskForm
