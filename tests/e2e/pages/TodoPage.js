class TodoPage {
  constructor(page) {
    this.page = page;

    this.titleInput = page.getByLabel('Task Title');
    this.dueDateInput = page.getByLabel(/Due Date/i);
    this.addTaskButton = page.getByRole('button', { name: 'Add Task' });
    this.updateTaskButton = page.getByRole('button', { name: 'Update Task' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addTask(title, dueDate = null) {
    await this.titleInput.fill(title);

    if (dueDate) {
      await this.dueDateInput.fill(dueDate);
    }

    await this.addTaskButton.click();
  }

  async clickTaskCheckbox(title) {
    const taskItem = this.page.locator('.task-item', {
      has: this.page.getByText(title),
    });
    await taskItem.locator('.task-checkbox').click();
  }

  async clickEditForTask(title) {
    const taskItem = this.page.locator('.task-item', {
      has: this.page.getByText(title),
    });
    await taskItem.getByTitle('Edit task').click();
  }

  async clickDeleteForTask(title) {
    const taskItem = this.page.locator('.task-item', {
      has: this.page.getByText(title),
    });
    await taskItem.getByTitle('Delete task').click();
  }

  async confirmDelete() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }

  taskByTitle(title) {
    return this.page.locator('.task-item', {
      has: this.page.getByText(title),
    });
  }
}

module.exports = { TodoPage };
