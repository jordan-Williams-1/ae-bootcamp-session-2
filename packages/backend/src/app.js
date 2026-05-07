const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initializeDatabase } = require('./utils/database');
const { createTasksRouter } = require('./routes/tasks');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize database
const db = initializeDatabase();

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend server is running' });
});

// Task routes
const tasksRouter = createTasksRouter(db);
app.use('/api/tasks', tasksRouter);

module.exports = { app, db };