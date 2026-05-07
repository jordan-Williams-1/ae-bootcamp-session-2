const {
  validateTaskTitle,
  validateDueDate,
  validateTaskId,
} = require('../src/utils/validators');

describe('Validators', () => {
  describe('validateTaskTitle', () => {
    test('should return valid for a proper task title', () => {
      const result = validateTaskTitle('Buy groceries');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should return invalid for empty string', () => {
      const result = validateTaskTitle('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should return invalid for null or undefined', () => {
      expect(validateTaskTitle(null).isValid).toBe(false);
      expect(validateTaskTitle(undefined).isValid).toBe(false);
    });

    test('should return invalid for non-string input', () => {
      const result = validateTaskTitle(123);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should return invalid for title exceeding max length', () => {
      const longTitle = 'a'.repeat(256);
      const result = validateTaskTitle(longTitle);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must not exceed');
    });

    test('should trim whitespace and validate', () => {
      const result = validateTaskTitle('  Valid Title  ');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateDueDate', () => {
    test('should return valid for a proper ISO date', () => {
      const result = validateDueDate('2026-12-25');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should return valid for ISO datetime', () => {
      const result = validateDueDate('2026-12-25T10:30:00Z');
      expect(result.isValid).toBe(true);
    });

    test('should return valid for empty/null due date (optional)', () => {
      expect(validateDueDate(null).isValid).toBe(true);
      expect(validateDueDate(undefined).isValid).toBe(true);
      expect(validateDueDate('').isValid).toBe(true);
    });

    test('should return invalid for invalid date string', () => {
      const result = validateDueDate('invalid-date');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should return invalid for non-string input', () => {
      const result = validateDueDate(123);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('validateTaskId', () => {
    test('should return valid for positive integer', () => {
      const result = validateTaskId(1);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should return valid for string representation of positive integer', () => {
      const result = validateTaskId('42');
      expect(result.isValid).toBe(true);
    });

    test('should return invalid for zero', () => {
      const result = validateTaskId(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should return invalid for negative numbers', () => {
      const result = validateTaskId(-1);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should return invalid for non-numeric string', () => {
      const result = validateTaskId('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
