import { useState, useCallback } from 'react';
import { apiCall } from '../utils/apiClient';
import { API_TASKS_URL } from '../constants';

/**
 * Custom hook for handling API calls
 * @param {function} apiFunction - Async function to call API
 * @param {*} initialData - Initial data value
 * @returns {object} Hook state and handlers
 */
export function useApiCall(apiFunction, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute, setData, setError };
}

/**
 * Custom hook for managing tasks
 * @returns {object} Tasks state and handlers
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(API_TASKS_URL);
      setTasks(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new task
  const createTask = useCallback(async (title, dueDate = null) => {
    try {
      setError(null);
      const newTask = await apiCall(API_TASKS_URL, {
        method: 'POST',
        body: JSON.stringify({ title, dueDate }),
      });
      setTasks(prevTasks => [newTask, ...prevTasks]);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update a task
  const updateTask = useCallback(async (id, updates) => {
    try {
      setError(null);
      const updatedTask = await apiCall(`${API_TASKS_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Toggle task completion
  const toggleTaskComplete = useCallback(async (id) => {
    try {
      setError(null);
      const updatedTask = await apiCall(`${API_TASKS_URL}/${id}/complete`, {
        method: 'PATCH',
      });
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (id) => {
    try {
      setError(null);
      await apiCall(`${API_TASKS_URL}/${id}`, {
        method: 'DELETE',
      });
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    toggleTaskComplete,
    deleteTask,
  };
}
