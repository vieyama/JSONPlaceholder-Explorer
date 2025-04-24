/// <reference types="node" />
import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});
