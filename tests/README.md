# Tests

This directory contains all tests for the RR Equipment web application.

## Structure

```[plaintext]
tests/
├── unit/                   # Unit tests
│   ├── blog.test.ts       # Blog functionality tests
│   └── seo.test.ts        # SEO utilities tests
├── integration/           # Integration tests
│   └── blog-pages.test.ts # Blog pages integration tests
├── e2e/                   # End-to-end tests
│   └── blog-navigation.spec.ts # Blog navigation E2E tests
├── vitest.config.ts       # Vitest configuration
├── setup.ts              # Test setup and mocks
└── README.md             # This file
```

## Running Tests

### Unit and Integration Tests (Vitest)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test blog.test.ts
```

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run specific E2E test
npx playwright test blog-navigation.spec.ts
```

## Test Types

### Unit Tests

- Test individual functions and utilities
- Mock external dependencies
- Fast execution
- Located in `tests/unit/`

### Integration Tests

- Test component interactions
- Test API integrations
- Test page rendering
- Located in `tests/integration/`

### End-to-End Tests

- Test complete user workflows
- Test across real browsers
- Test accessibility and responsive design
- Located in `tests/e2e/`

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../../src/lib/myModule';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

### Integration Test Example

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '../../src/components/MyComponent';

it('should render component correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to page', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL('/about');
});
```

## Test Configuration

### Vitest

- Configuration in `vitest.config.ts`
- Uses jsdom environment for DOM testing
- Includes React testing utilities
- Path aliases configured for imports

### Playwright

- Configuration in `playwright.config.ts` (root level)
- Tests multiple browsers (Chromium, Firefox, WebKit)
- Includes mobile device testing
- Screenshot and video recording on failure

## Best Practices

1. **Test Structure**: Follow the Arrange-Act-Assert pattern
2. **Descriptive Names**: Use clear, descriptive test names
3. **Single Responsibility**: Each test should verify one thing
4. **Mock External Dependencies**: Use mocks for external APIs, databases
5. **Clean Up**: Restore state after tests when necessary
6. **Performance**: Keep tests fast and focused

## Continuous Integration

Tests run automatically on:

- Pull requests
- Pushes to main branch
- Scheduled nightly runs

Coverage reports are generated and uploaded to the CI dashboard.

## Debugging Tests

### Unit/Integration Tests

```bash
# Debug specific test
npm test -- --reporter=verbose blog.test.ts

# Run with debugger
node --inspect-brk node_modules/.bin/vitest blog.test.ts
```

### E2E Tests

```bash
# Debug mode with browser window
npx playwright test --debug

# Headed mode
npx playwright test --headed

# Step through test
npx playwright test --ui
```
