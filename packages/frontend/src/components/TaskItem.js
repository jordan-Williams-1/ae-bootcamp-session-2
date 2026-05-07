import React from 'react';
import { formatDateForDisplay, isTaskOverdue } from '../utils/dateFormatter';
import './TaskItem.css';

/**
 * TaskItem Component - Displays a single task
 * @param {object} task - Task object
 * @param {function} onToggleComplete - Handler for toggling completion
 * @param {function} onEdit - Handler for editing
 * @param {function} onDelete - Handler for deleting
 */
export function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const { id, title, dueDate, isComplete } = task;
  const overdue = !isComplete && isTaskOverdue(dueDate);

  return (
    <div className={`task-item ${isComplete ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={isComplete}
          onChange={() => onToggleComplete(id)}
          aria-label={`Mark ${title} as ${isComplete ? 'incomplete' : 'complete'}`}
        />
        <div className="task-content">
          <p className="task-title">{title}</p>
          {dueDate && (
            <p className="task-due-date">
              Due: {formatDateForDisplay(dueDate)}
            </p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(id)}
          aria-label={`Edit ${title}`}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${title}`}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
