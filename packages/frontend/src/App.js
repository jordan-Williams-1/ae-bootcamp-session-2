import React, { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import './App.css';

function App() {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    toggleTaskComplete,
    deleteTask,
  } = useTasks();

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const editingTask = editingTaskId ? tasks.find(t => t.id === editingTaskId) : null;

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      setSubmitError('');

      if (editingTaskId) {
        await updateTask(editingTaskId, formData);
        setEditingTaskId(null);
      } else {
        await createTask(formData.title, formData.dueDate);
      }
    } catch (err) {
      setSubmitError(err.message);
      throw err;
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    // Scroll to form
    setTimeout(() => {
      document.querySelector('.task-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setSubmitError('');
  };

  const handleToggleComplete = async (taskId) => {
    try {
      await toggleTaskComplete(taskId);
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My Tasks</h1>
        <p>Keep track of everything you need to do</p>
      </header>

      <main className="app-main">
        <div className="app-container">
          {error && <div className="error-banner">{error}</div>}
          {submitError && <div className="error-banner">{submitError}</div>}

          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
            loading={submitLoading}
          />

          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            loading={loading}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React • Task Manager v1.0</p>
      </footer>
    </div>
  );
}

export default App;
