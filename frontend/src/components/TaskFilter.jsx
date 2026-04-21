import './TaskFilter.css'
import { useState, useEffect, useRef } from 'react'

function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="task-filter">
      <button
        className={`task-filter-btn ${filter === 'pending' ? 'task-filter-btn-pending-active' : 'task-filter-btn-pending'}`}
        onClick={() => {
          if (filter !== 'pending') {
            onFilterChange('pending')
          } else {
            onFilterChange('all')
          }
        }}
      >
        Pending
      </button>
      <button
        className={`task-filter-btn ${filter === 'in-progress' ? 'task-filter-btn-in-progress-active' : 'task-filter-btn-in-progress'}`}
        onClick={() => {
          if (filter !== 'in-progress') {
            onFilterChange('in-progress')
          } else {
            onFilterChange('all')
          }
        }}
      >
        In progress
      </button>
      <button
        className={`task-filter-btn ${filter === 'done' ? 'task-filter-btn-done-active' : 'task-filter-btn-done'}`}
        onClick={() => {
          if (filter !== 'done') {
            onFilterChange('done')
          } else {
            onFilterChange('all')
          }
        }}
      >
        Done
      </button>
    </div>
  )
}

export default TaskFilter