const Database = require('better-sqlite3');

/**
 * Initializes database with tasks table
 * @returns {Database} Database instance
 */
function initializeDatabase() {
  const db = new Database(':memory:');

  // Create tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      due_date TEXT,
      is_complete INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Task database initialized');
  return db;
}

module.exports = {
  initializeDatabase,
};
