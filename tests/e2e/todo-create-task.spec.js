const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO - Create Task Journey', () => {
  test('user can create a new task', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTask('E2E: create task');

    await expect(todoPage.taskByTitle('E2E: create task')).toBeVisible();
  });
});
