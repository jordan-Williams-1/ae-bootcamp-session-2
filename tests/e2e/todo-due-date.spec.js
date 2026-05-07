const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO - Due Date Journey', () => {
  test('user can add a task with due date', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTask('E2E: due date task', '2026-12-31');

    const task = todoPage.taskByTitle('E2E: due date task');
    await expect(task).toBeVisible();
    await expect(task.getByText(/Due: 2026-12-31/)).toBeVisible();
  });
});
