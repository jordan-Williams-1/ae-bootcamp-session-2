// API configuration
// Use relative URLs by default so dev proxy works in local and forwarded environments.
export const API_BASE_URL = process.env.REACT_APP_API_URL || '';
export const API_TASKS_URL = `${API_BASE_URL}/api/tasks`;
