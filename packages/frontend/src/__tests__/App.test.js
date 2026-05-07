import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the useTasks hook
jest.mock('../hooks/useTasks', () => ({
  useTasks: () => ({
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    toggleTaskComplete: jest.fn(),
    deleteTask: jest.fn(),
  }),
}));

describe('App Component', () => {
  test('renders app header', () => {
    render(<App />);
    expect(screen.getByText('📝 My Tasks')).toBeInTheDocument();
  });

  test('renders task form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/What needs to be done/)).toBeInTheDocument();
  });

  test('renders task list', () => {
    render(<App />);
    expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    expect(screen.getByText(/Built with React/)).toBeInTheDocument();
  });

  test('shows empty state message', () => {
    render(<App />);
    expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
  });
});
