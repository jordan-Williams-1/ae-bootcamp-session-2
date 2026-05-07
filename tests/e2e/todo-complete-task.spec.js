const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO - Complete Task Journey', () => {
  test('user can check and uncheck a task', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTask('E2E: complete task');

    await todoPage.clickTaskCheckbox('E2E: complete task');
    await expect(todoPage.taskByTitle('E2E: complete task')).toHaveClass(/completed/);

    await todoPage.clickTaskCheckbox('E2E: complete task');
    await expect(todoPage.taskByTitle('E2E: complete task')).not.toHaveClass(/completed/);
  });
});
