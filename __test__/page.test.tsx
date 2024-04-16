import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '../app/(public)/login/page';

test('Page', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined();
});
