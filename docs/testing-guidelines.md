# Testing Guidelines

## General Principles

- All new features must include appropriate tests.
- Tests must be isolated and independent — each test sets up its own data and does not rely on other tests.
- Setup and teardown hooks are required so tests succeed on multiple runs.
- Tests must be deterministic and maintainable, following best practices.

## Unit Tests

- Use **Jest** to test individual functions and React components in isolation.
- File naming convention: `*.test.js` or `*.test.ts`.
- Name test files to match what they test (e.g., `app.test.js` for `app.js`).
- Backend unit tests: `packages/backend/__tests__/`
- Frontend unit tests: `packages/frontend/src/__tests__/`

## Integration Tests

- Use **Jest + Supertest** to test backend API endpoints with real HTTP requests.
- File naming convention: `*.test.js` or `*.test.ts`.
- Name files based on what they test (e.g., `todos-api.test.js` for TODO API endpoints).
- Location: `packages/backend/__tests__/integration/`

## End-to-End (E2E) Tests

- Use **Playwright** (required framework) to test complete UI workflows through browser automation.
- File naming convention: `*.spec.js` or `*.spec.ts`.
- Name files based on the user journey they test (e.g., `todo-workflow.spec.js`).
- Location: `tests/e2e/`
- Use **one browser only**.
- Must follow the **Page Object Model (POM)** pattern for maintainability.
- Limit to **5–8 critical user journeys** — focus on happy paths and key edge cases, not exhaustive coverage.

## Port Configuration

- Always use environment variables with sensible defaults.
- Backend: `const PORT = process.env.PORT || 3030;`
- Frontend: React's default port is `3000`, overridable with the `PORT` environment variable.
- This allows CI/CD workflows to dynamically detect ports.
