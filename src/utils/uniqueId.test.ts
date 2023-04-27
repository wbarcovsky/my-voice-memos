import { test, expect } from '@jest/globals';
import { uniqueId } from './uniqueId';

test('test uniqueId utils', () => {
  const val1 = uniqueId();
  const val2 = uniqueId();
  expect(val1).toMatch(/[0-9a-z]+/);
  expect(val2).toMatch(/[0-9a-z]+/);
  expect(val1 !== val2).toBeTruthy();
});
