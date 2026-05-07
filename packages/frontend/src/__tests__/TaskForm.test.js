import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../components/TaskForm';

describe('TaskForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with title and due date inputs', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Task Title')).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
  });

  test('renders "Add Task" button for new task', () => {
    render(<TaskForm task={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByRole('button', { name: /Add Task/ })).toBeInTheDocument();
  });

  test('renders "Update Task" button when editing', () => {
    const task = { id: 1, title: 'Test', dueDate: '2026-12-25', isComplete: false };
    render(<TaskForm task={task} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByRole('button', { name: /Update Task/ })).toBeInTheDocument();
  });

  test('populates form fields when editing a task', () => {
    const task = {
      id: 1,
      title: 'Buy groceries',
      dueDate: '2026-12-25',
      isComplete: false,
    };
    render(<TaskForm task={task} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByDisplayValue('Buy groceries')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2026-12-25')).toBeInTheDocument();
  });

  test('submits form with title and due date', async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText('Task Title');
    const dueDateInput = screen.getByLabelText(/Due Date/i);
    const submitButton = screen.getByRole('button', { name: /Add Task/ });

    await user.type(titleInput, 'New task');
    await user.type(dueDateInput, '2026-12-25');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New task',
      dueDate: '2026-12-25',
    });
  });

  test('shows error when title is empty', async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const submitButton = screen.getByRole('button', { name: /Add Task/ });
    await user.click(submitButton);

    expect(screen.getByText('Task title is required')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const task = { id: 1, title: 'Test', dueDate: null, isComplete: false };
    render(<TaskForm task={task} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('disables inputs when loading', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={true}
      />
    );

    const titleInput = screen.getByLabelText('Task Title');
    const dueDateInput = screen.getByLabelText(/Due Date/i);
    const submitButton = screen.getByRole('button', { name: /Saving/ });

    expect(titleInput).toBeDisabled();
    expect(dueDateInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
