import { render, screen } from '@testing-library/react';
import { TaskList } from '../components/TaskList';

describe('TaskList Component', () => {
  const mockHandlers = {
    onToggleComplete: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no tasks', () => {
    render(
      <TaskList
        tasks={[]}
        {...mockHandlers}
      />
    );
    expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(
      <TaskList
        tasks={[]}
        {...mockHandlers}
        loading={true}
      />
    );
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  test('renders list of tasks', () => {
    const tasks = [
      { id: 1, title: 'Task 1', dueDate: null, isComplete: false },
      { id: 2, title: 'Task 2', dueDate: null, isComplete: false },
    ];
    render(
      <TaskList
        tasks={tasks}
        {...mockHandlers}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('displays task completion counter', () => {
    const tasks = [
      { id: 1, title: 'Task 1', dueDate: null, isComplete: true },
      { id: 2, title: 'Task 2', dueDate: null, isComplete: false },
      { id: 3, title: 'Task 3', dueDate: null, isComplete: false },
    ];
    render(
      <TaskList
        tasks={tasks}
        {...mockHandlers}
      />
    );

    expect(screen.getByText('1/3 completed')).toBeInTheDocument();
  });

  test('renders Tasks heading', () => {
    const tasks = [
      { id: 1, title: 'Task 1', dueDate: null, isComplete: false },
    ];
    render(
      <TaskList
        tasks={tasks}
        {...mockHandlers}
      />
    );

    expect(screen.getByRole('heading', { name: 'Tasks' })).toBeInTheDocument();
  });
});
