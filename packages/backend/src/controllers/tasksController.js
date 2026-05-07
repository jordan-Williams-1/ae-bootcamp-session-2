const {
  validateTaskTitle,
  validateDueDate,
  validateTaskId,
} = require('../utils/validators');

/**
 * Create a new task
 * @param {Database} db - Database instance
 * @param {object} taskData - Task data (title, dueDate)
 * @returns {object} Created task with id
 */
function createTask(db, taskData) {
  const { title, dueDate } = taskData;

  // Validate title
  const titleValidation = validateTaskTitle(title);
  if (!titleValidation.isValid) {
    const error = new Error(titleValidation.error);
    error.statusCode = 400;
    throw error;
  }

  // Validate due date if provided
  if (dueDate) {
    const dateValidation = validateDueDate(dueDate);
    if (!dateValidation.isValid) {
      const error = new Error(dateValidation.error);
      error.statusCode = 400;
      throw error;
    }
  }

  try {
    const stmt = db.prepare(
      `INSERT INTO tasks (title, due_date, is_complete)
       VALUES (?, ?, 0)`
    );
    const result = stmt.run(title.trim(), dueDate || null);

    return getTaskById(db, result.lastInsertRowid);
  } catch (error) {
    const dbError = new Error('Failed to create task');
    dbError.statusCode = 500;
    throw dbError;
  }
}

/**
 * Get all tasks
 * @param {Database} db - Database instance
 * @returns {Array} Array of tasks
 */
function getAllTasks(db) {
  try {
    const tasks = db
      .prepare(
        `SELECT id, title, due_date as dueDate, is_complete as isComplete,
                created_at as createdAt, updated_at as updatedAt
         FROM tasks ORDER BY created_at DESC`
      )
      .all();

    return tasks.map(task => ({
      ...task,
      isComplete: Boolean(task.isComplete),
    }));
  } catch (error) {
    const dbError = new Error('Failed to fetch tasks');
    dbError.statusCode = 500;
    throw dbError;
  }
}

/**
 * Get a task by ID
 * @param {Database} db - Database instance
 * @param {number} id - Task ID
 * @returns {object} Task object
 */
function getTaskById(db, id) {
  const idValidation = validateTaskId(id);
  if (!idValidation.isValid) {
    const error = new Error(idValidation.error);
    error.statusCode = 400;
    throw error;
  }

  try {
    const task = db
      .prepare(
        `SELECT id, title, due_date as dueDate, is_complete as isComplete,
                created_at as createdAt, updated_at as updatedAt
         FROM tasks WHERE id = ?`
      )
      .get(id);

    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      ...task,
      isComplete: Boolean(task.isComplete),
    };
  } catch (error) {
    if (error.statusCode) throw error;
    const dbError = new Error('Failed to fetch task');
    dbError.statusCode = 500;
    throw dbError;
  }
}

/**
 * Update a task
 * @param {Database} db - Database instance
 * @param {number} id - Task ID
 * @param {object} updates - Fields to update (title, dueDate)
 * @returns {object} Updated task
 */
function updateTask(db, id, updates) {
  const idValidation = validateTaskId(id);
  if (!idValidation.isValid) {
    const error = new Error(idValidation.error);
    error.statusCode = 400;
    throw error;
  }

  // Get existing task
  const existingTask = getTaskById(db, id);

  // Validate updates
  if (updates.title !== undefined) {
    const titleValidation = validateTaskTitle(updates.title);
    if (!titleValidation.isValid) {
      const error = new Error(titleValidation.error);
      error.statusCode = 400;
      throw error;
    }
  }

  if (updates.dueDate !== undefined) {
    const dateValidation = validateDueDate(updates.dueDate);
    if (!dateValidation.isValid) {
      const error = new Error(dateValidation.error);
      error.statusCode = 400;
      throw error;
    }
  }

  try {
    const newTitle = updates.title !== undefined ? updates.title.trim() : existingTask.title;
    const newDueDate = updates.dueDate !== undefined ? updates.dueDate : existingTask.dueDate;

    db.prepare(
      `UPDATE tasks
       SET title = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(newTitle, newDueDate || null, id);

    return getTaskById(db, id);
  } catch (error) {
    if (error.statusCode) throw error;
    const dbError = new Error('Failed to update task');
    dbError.statusCode = 500;
    throw dbError;
  }
}

/**
 * Toggle task completion status
 * @param {Database} db - Database instance
 * @param {number} id - Task ID
 * @returns {object} Updated task
 */
function toggleTaskComplete(db, id) {
  const idValidation = validateTaskId(id);
  if (!idValidation.isValid) {
    const error = new Error(idValidation.error);
    error.statusCode = 400;
    throw error;
  }

  try {
    // Get current status
    const task = getTaskById(db, id);

    // Toggle completion
    db.prepare(
      `UPDATE tasks
       SET is_complete = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(task.isComplete ? 0 : 1, id);

    return getTaskById(db, id);
  } catch (error) {
    if (error.statusCode) throw error;
    const dbError = new Error('Failed to update task');
    dbError.statusCode = 500;
    throw dbError;
  }
}

/**
 * Delete a task
 * @param {Database} db - Database instance
 * @param {number} id - Task ID
 */
function deleteTask(db, id) {
  const idValidation = validateTaskId(id);
  if (!idValidation.isValid) {
    const error = new Error(idValidation.error);
    error.statusCode = 400;
    throw error;
  }

  try {
    // Verify task exists
    getTaskById(db, id);

    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  } catch (error) {
    if (error.statusCode) throw error;
    const dbError = new Error('Failed to delete task');
    dbError.statusCode = 500;
    throw dbError;
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  toggleTaskComplete,
  deleteTask,
};
