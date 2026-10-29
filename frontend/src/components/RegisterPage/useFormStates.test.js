import { act, renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { toast } from 'react-toastify';
import useFormStates, { checkGitHubID, handleSubmit } from './useFormStates';

vi.mock('react-toastify', () => ({ toast: { error: vi.fn() } }));

test('restores the leader email without filling other team members', () => {
  localStorage.setItem('register_user_info', JSON.stringify({ email: 'leader@example.com' }));
  const { result } = renderHook(() => useFormStates());
  expect(result.current.mail1).toBe('leader@example.com');
  expect(result.current.mail2).toBe('');
  act(() => result.current.setMail2('member@example.com'));
  expect(result.current.mail2).toBe('member@example.com');
  expect(result.current.mail1).toBe('leader@example.com');
});

test('accepts complete registration details with an optional GitHub username', () => {
  expect(handleSubmit('Ada Lovelace', '9876543210', 'IIT Kharagpur', '2', '')).toBe(true);
  expect(toast.error).not.toHaveBeenCalled();
});

test.each([
  ['blank name', '   ', '9876543210', 'IIT Kharagpur', '2', 'ada'],
  ['short mobile number', 'Ada', '123', 'IIT Kharagpur', '2', 'ada'],
  ['blank college', 'Ada', '9876543210', '', '2', 'ada'],
  ['out of range year', 'Ada', '9876543210', 'IIT Kharagpur', '6', 'ada'],
  ['invalid GitHub username', 'Ada', '9876543210', 'IIT Kharagpur', '2', '-ada'],
])('rejects registration with %s', (_label, ...details) => {
  expect(handleSubmit(...details)).toBe(false);
  expect(toast.error).toHaveBeenCalledTimes(1);
});

test('normalizes whitespace in optional GitHub usernames', () => {
  expect(checkGitHubID('  ada-lovelace  ')).toBe('ada-lovelace');
  expect(checkGitHubID(undefined)).toBe('');
});
