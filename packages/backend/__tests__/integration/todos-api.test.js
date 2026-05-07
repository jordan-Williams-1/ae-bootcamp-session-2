const request = require('supertest');
const { app, db } = require('../../src/app');

describe('Tasks API Endpoints', () => {
  beforeEach(() => {
    // Clear tasks table before each test
    db.prepare('DELETE FROM tasks').run();
  });

  describe('POST /api/tasks', () => {
    test('should create a new task with title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Buy groceries' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Buy groceries');
      expect(response.body.isComplete).toBe(false);
    });

    test('should create a task with due date', async () => {
      const dueDate = '2026-12-25';
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Holiday shopping', dueDate });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Holiday shopping');
      expect(response.body.dueDate).toBe(dueDate);
    });

    test('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for empty title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '' });

      expect(response.status).toBe(400);
    });

    test('should return 400 for title exceeding max length', async () => {
      const longTitle = 'a'.repeat(256);
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: longTitle });

      expect(response.status).toBe(400);
    });

    test('should return 400 for invalid due date', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test task', dueDate: 'invalid-date' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/tasks', () => {
    test('should return empty array when no tasks exist', async () => {
      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    test('should return all tasks', async () => {
      const createResponse1 = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 1' });
      const createResponse2 = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 2' });

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      const titles = response.body.map(t => t.title);
      expect(titles).toContain('Task 1');
      expect(titles).toContain('Task 2');
    });
  });

  describe('GET /api/tasks/:id', () => {
    test('should return a specific task by ID', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Get this task' });

      const taskId = createResponse.body.id;
      const response = await request(app).get(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(taskId);
      expect(response.body.title).toBe('Get this task');
    });

    test('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for invalid task ID', async () => {
      const response = await request(app).get('/api/tasks/invalid');

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    test('should update task title', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Old title' });

      const taskId = createResponse.body.id;
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ title: 'New title' });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('New title');
    });

    test('should update task due date', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task' });

      const taskId = createResponse.body.id;
      const newDate = '2027-01-01';
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ dueDate: newDate });

      expect(response.status).toBe(200);
      expect(response.body.dueDate).toBe(newDate);
    });

    test('should return 400 for invalid title', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task' });

      const taskId = createResponse.body.id;
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ title: '' });

      expect(response.status).toBe(400);
    });

    test('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id/complete', () => {
    test('should toggle task to complete', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to complete' });

      const taskId = createResponse.body.id;
      const response = await request(app).patch(`/api/tasks/${taskId}/complete`);

      expect(response.status).toBe(200);
      expect(response.body.isComplete).toBe(true);
    });

    test('should toggle task back to incomplete', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task' });

      const taskId = createResponse.body.id;

      // Complete it
      await request(app).patch(`/api/tasks/${taskId}/complete`);

      // Toggle back
      const response = await request(app).patch(`/api/tasks/${taskId}/complete`);

      expect(response.status).toBe(200);
      expect(response.body.isComplete).toBe(false);
    });

    test('should return 404 for non-existent task', async () => {
      const response = await request(app).patch('/api/tasks/999/complete');

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    test('should delete a task', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to delete' });

      const taskId = createResponse.body.id;
      const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);

      expect(deleteResponse.status).toBe(204);

      // Verify task is deleted
      const getResponse = await request(app).get(`/api/tasks/${taskId}`);
      expect(getResponse.status).toBe(404);
    });

    test('should return 404 when deleting non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/999');

      expect(response.status).toBe(404);
    });

    test('should return 400 for invalid task ID', async () => {
      const response = await request(app).delete('/api/tasks/invalid');

      expect(response.status).toBe(400);
    });
  });

  describe('Complete workflow', () => {
    test('should handle create, update, complete, and delete', async () => {
      // Create
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Complete workflow', dueDate: '2026-12-31' });

      expect(createResponse.status).toBe(201);
      const taskId = createResponse.body.id;

      // Update
      const updateResponse = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ title: 'Updated workflow task' });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.title).toBe('Updated workflow task');

      // Complete
      const completeResponse = await request(app).patch(
        `/api/tasks/${taskId}/complete`
      );

      expect(completeResponse.status).toBe(200);
      expect(completeResponse.body.isComplete).toBe(true);

      // Delete
      const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);

      expect(deleteResponse.status).toBe(204);
    });
  });
});
