import React from 'react';
import { TaskItem } from './TaskItem';
import './TaskList.css';

/**
 * TaskList Component - Displays list of tasks
 * @param {Array} tasks - Array of task objects
 * @param {function} onToggleComplete - Handler for toggling completion
 * @param {function} onEdit - Handler for editing
 * @param {function} onDelete - Handler for deleting
 * @param {boolean} loading - Loading state
 */
export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  loading = false,
}) {
  if (loading) {
    return <div className="task-list-loading">Loading tasks...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Add one to get started! 🚀</p>
      </div>
    );
  }

  const completedCount = tasks.filter(task => task.isComplete).length;
  const totalCount = tasks.length;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <span className="task-count">
          {completedCount}/{totalCount} completed
        </span>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
