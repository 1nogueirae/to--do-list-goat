import { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const API_URL = 'http://localhost:3000/api/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [taskBeingEdited, setTaskBeingEdited] = useState(null)

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
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <main>
      <TaskForm
        onTaskCreated={fetchTasks}
        onTaskUpdated={updateTask}
        editingTask={taskBeingEdited}
        onCancelEdit={cancelTaskEdit}
      />
      <TaskList tasks={tasks} isLoading={isLoading} error={error} onDelete={deleteTask} onEdit={startTaskEdit} />
    </main>
  )
}

export default Tasks
