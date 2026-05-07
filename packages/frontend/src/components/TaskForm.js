import React, { useState, useEffect } from 'react';
import { formatDateForInput } from '../utils/dateFormatter';
import { Button } from './Button';
import './TaskForm.css';

/**
 * TaskForm Component - Form for creating/editing tasks
 * @param {object} task - Task to edit (null for new task)
 * @param {function} onSubmit - Handler for form submission
 * @param {function} onCancel - Handler for canceling edit
 * @param {boolean} loading - Loading state
 */
export function TaskForm({ task, onSubmit, onCancel, loading = false }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate ? formatDateForInput(task.dueDate) : '');
    } else {
      setTitle('');
      setDueDate('');
    }
    setError('');
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        dueDate: dueDate || null,
      });
      setTitle('');
      setDueDate('');
    } catch (err) {
      setError(err.message || 'Failed to save task');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDueDate('');
    setError('');
    onCancel?.();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date (Optional)</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : task ? 'Update Task' : 'Add Task'}
        </Button>
        {task && (
          <button
            type="button"
            className="btn-cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
