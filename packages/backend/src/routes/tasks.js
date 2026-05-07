const express = require('express');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  toggleTaskComplete,
  deleteTask,
} = require('../controllers/tasksController');

/**
 * Create tasks router
 * @param {Database} db - Database instance
 * @returns {Router} Express router
 */
function createTasksRouter(db) {
  const router = express.Router();

  /**
   * POST /api/tasks
   * Create a new task
   */
  router.post('/', (req, res) => {
    try {
      const { title, dueDate } = req.body;
      const newTask = createTask(db, { title, dueDate });
      res.status(201).json(newTask);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  });

  /**
   * GET /api/tasks
   * Get all tasks
   */
  router.get('/', (req, res) => {
    try {
      const tasks = getAllTasks(db);
      res.json(tasks);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  });

  /**
   * GET /api/tasks/:id
   * Get a specific task by ID
   */
  router.get('/:id', (req, res) => {
    try {
      const task = getTaskById(db, req.params.id);
      res.json(task);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  });

  /**
   * PUT /api/tasks/:id
   * Update task details (title, due date)
   */
  router.put('/:id', (req, res) => {
    try {
      const { title, dueDate } = req.body;
      const updatedTask = updateTask(db, req.params.id, { title, dueDate });
      res.json(updatedTask);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  });

  /**
   * PATCH /api/tasks/:id/complete
   * Toggle task completion status
   */
  router.patch('/:id/complete', (req, res) => {
    try {
      const updatedTask = toggleTaskComplete(db, req.params.id);
      res.json(updatedTask);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  });

  /**
   * DELETE /api/tasks/:id
   * Delete a task
   */
  router.delete('/:id', (req, res) => {
    try {
      deleteTask(db, req.params.id);
      res.status(204).send();
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  });

  return router;
}

module.exports = {
  createTasksRouter,
};
