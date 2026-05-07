import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from '../components/TaskItem';

describe('TaskItem Component', () => {
  const mockTask = {
    id: 1,
    title: 'Buy groceries',
    dueDate: '2026-12-25',
    isComplete: false,
  };

  const mockHandlers = {
    onToggleComplete: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task title', () => {
    render(
      <TaskItem
        task={mockTask}
        {...mockHandlers}
      />
    );
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  test('renders task due date', () => {
    render(
      <TaskItem
        task={mockTask}
        {...mockHandlers}
      />
    );
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  test('checkbox is unchecked when task is incomplete', () => {
    render(
      <TaskItem
        task={mockTask}
        {...mockHandlers}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked when task is complete', () => {
    const completedTask = { ...mockTask, isComplete: true };
    render(
      <TaskItem
        task={completedTask}
        {...mockHandlers}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls onToggleComplete when checkbox is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        {...mockHandlers}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(1);
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        {...mockHandlers}
      />
    );
    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        {...mockHandlers}
      />
    );
    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  test('shows completed class when task is complete', () => {
    const completedTask = { ...mockTask, isComplete: true };
    const { container } = render(
      <TaskItem
        task={completedTask}
        {...mockHandlers}
      />
    );
    expect(container.querySelector('.task-item')).toHaveClass('completed');
  });
});
