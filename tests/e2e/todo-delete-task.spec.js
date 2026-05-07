const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO - Delete Task Journey', () => {
  test('user can delete a task', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTask('E2E: delete me');

    await todoPage.confirmDelete();
    await todoPage.clickDeleteForTask('E2E: delete me');

    await expect(todoPage.taskByTitle('E2E: delete me')).toHaveCount(0);
  });
});
