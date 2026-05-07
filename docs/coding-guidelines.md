# Coding Guidelines

## Overview

This document outlines the coding style and quality principles for the TODO app project. All code contributions should adhere to these standards to maintain consistency, readability, and sustainability across the codebase.

## Naming Conventions

### Variables and Functions

- Use **camelCase** for all variable and function names.
- Choose descriptive, intention-revealing names that clearly communicate purpose.
- Examples:
  - `const taskTitle = "Buy groceries";`
  - `function calculateDueDate() { ... }`
  - `const isTaskComplete = true;`

### Constants

- Use **UPPER_SNAKE_CASE** for constant values.
- Example: `const MAX_TASK_LENGTH = 255;`

### React Components

- Use **PascalCase** for component names.
- Example: `export function TaskItem() { ... }`

## Code Formatting

- Use **2 spaces** for indentation (no tabs).
- Lines should not exceed 100 characters in length.
- Add a blank line between logical sections of code.
- Use semicolons consistently at the end of statements.

## DRY Principle (Don't Repeat Yourself)

- Extract repeated logic into shared functions or utilities.
- Create reusable components instead of duplicating similar UI patterns.
- Use constants for values that appear multiple times.
- If you find yourself writing the same code twice, it's time to refactor.

## Code Quality

- Keep functions small and focused — each function should do one thing well.
- Write code that is easy to test and maintain.
- Add comments to explain the "why" behind complex logic, not the "what" (code should be self-documenting).
- Avoid deeply nested conditionals; use early returns or guard clauses instead.

## Imports and Organization

- Group imports logically: external dependencies, then internal modules, then relative paths.
- Remove unused imports.
- Keep import statements at the top of the file.

## Best Practices

- Avoid magic numbers and strings — use named constants instead.
- Prefer explicit over implicit; clarity trumps brevity.
- Use template literals for string interpolation rather than concatenation.
- Leverage modern JavaScript/React features (destructuring, async/await, etc.).
- Ensure code is accessible and performant.

## Error Handling

- Always handle errors gracefully; provide meaningful error messages.
- Validate user input before processing.
- Use try/catch blocks appropriately for asynchronous operations.
