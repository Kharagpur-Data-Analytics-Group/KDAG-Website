import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import LoginPrompt from './LoginPrompt';

test('hides the login prompt when closed', () => {
  render(<LoginPrompt open={false} onClose={vi.fn()} />);
  expect(screen.queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
});

test('shows the requested message and only dismisses on a backdrop click', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  render(<LoginPrompt open onClose={onClose} message="Sign in to save your progress" />);

  const message = screen.getByText('Sign in to save your progress');
  expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled();
  await user.click(message);
  expect(onClose).not.toHaveBeenCalled();
  await user.click(document.querySelector('.login-prompt-backdrop'));
  expect(onClose).toHaveBeenCalledTimes(1);
});
