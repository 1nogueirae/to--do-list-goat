import { useEffect, useRef, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import Toast from '../components/Toast'
import TaskFilter from '../components/TaskFilter'

const API_URL = 'http://localhost:3000/api/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [taskBeingEdited, setTaskBeingEdited] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimeoutRef = useRef(null)

  const showToast = (message, type) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast({ message, type })
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000)
  }

  const fetchTasks = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Could not load tasks.')
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      })
      if (!response.ok) throw new Error('Could not update task.')
      setTaskBeingEdited(null)
      showToast('Task updated successfully!', 'success')
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const startTaskEdit = (task) => {
    setError(null)
    setTaskBeingEdited(task)
  }

  const cancelTaskEdit = () => {
    setTaskBeingEdited(null)
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not delete task.')
      fetchTasks()
      showToast('Task deleted successfully!', 'success')
    } catch (err) {
      setError(err.message)
    }
  }

  const taskComplete = async (taskId) => {
    setError(null)
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: task.title, description: task.description, status: 'done' }),
      })
      if (!response.ok) throw new Error('Could not complete task.')
      showToast('Task completed successfully!', 'success')
      fetchTasks()
    } catch (err) {
      setError(err.message)
      showToast(err.message, 'error')
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  return (
    <main>
      <TaskForm
        onTaskCreated={fetchTasks}
        onTaskUpdated={updateTask}
        editingTask={taskBeingEdited}
        onCancelEdit={cancelTaskEdit}
        showToast={showToast}
      />
      <TaskFilter></TaskFilter>
      <TaskList tasks={tasks} isLoading={isLoading} error={error} onDelete={deleteTask} onEdit={startTaskEdit} onComplete={taskComplete} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  )
}

export default Tasks