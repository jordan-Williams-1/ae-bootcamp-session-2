/**
 * Format date to ISO string for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDateForDisplay(date) {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Format date for input field (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDateForInput(date) {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Check if a task is overdue
 * @param {string|Date} dueDate - Task due date
 * @returns {boolean} True if task is overdue
 */
export function isTaskOverdue(dueDate) {
  if (!dueDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDateObj = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  dueDateObj.setHours(0, 0, 0, 0);

  return dueDateObj < today;
}
