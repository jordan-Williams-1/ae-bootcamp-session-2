const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO - Edit Task Journey', () => {
  test('user can edit an existing task', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTask('E2E: old title', '2026-12-01');

    await todoPage.clickEditForTask('E2E: old title');

    await todoPage.titleInput.fill('E2E: updated title');
    await todoPage.dueDateInput.fill('2026-12-15');
    await todoPage.updateTaskButton.click();

    const updatedTask = todoPage.taskByTitle('E2E: updated title');
    await expect(updatedTask).toBeVisible();
    await expect(updatedTask.getByText(/Due: 2026-12-15/)).toBeVisible();
  });
});
