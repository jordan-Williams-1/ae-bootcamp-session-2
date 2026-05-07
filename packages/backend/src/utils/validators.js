const { MAX_TASK_LENGTH, MIN_TASK_LENGTH } = require('../constants');

/**
 * Validates task title
 * @param {string} title - The task title to validate
 * @returns {object} Object with isValid and error properties
 */
function validateTaskTitle(title) {
  if (!title || typeof title !== 'string') {
    return {
      isValid: false,
      error: 'Task title must be a non-empty string',
    };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < MIN_TASK_LENGTH) {
    return {
      isValid: false,
      error: `Task title must be at least ${MIN_TASK_LENGTH} character long`,
    };
  }

  if (trimmedTitle.length > MAX_TASK_LENGTH) {
    return {
      isValid: false,
      error: `Task title must not exceed ${MAX_TASK_LENGTH} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validates due date
 * @param {string} dueDate - The due date in ISO format
 * @returns {object} Object with isValid and error properties
 */
function validateDueDate(dueDate) {
  if (!dueDate) {
    return { isValid: true }; // Due date is optional
  }

  if (typeof dueDate !== 'string') {
    return {
      isValid: false,
      error: 'Due date must be a valid date string',
    };
  }

  const dateObj = new Date(dueDate);
  if (isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      error: 'Due date must be a valid ISO date format',
    };
  }

  return { isValid: true };
}

/**
 * Validates task ID
 * @param {number} id - The task ID to validate
 * @returns {object} Object with isValid and error properties
 */
function validateTaskId(id) {
  const numId = parseInt(id, 10);

  if (isNaN(numId) || numId <= 0) {
    return {
      isValid: false,
      error: 'Task ID must be a positive integer',
    };
  }

  return { isValid: true };
}

module.exports = {
  validateTaskTitle,
  validateDueDate,
  validateTaskId,
};
