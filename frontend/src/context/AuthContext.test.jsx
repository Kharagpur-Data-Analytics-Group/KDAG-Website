import React, { useContext } from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { AuthProvider, AuthContext } from './AuthContext';

function Status() {
  const { isLoggedIn, userInfo } = useContext(AuthContext);
  return <div>{isLoggedIn ? userInfo.email : 'signed out'}</div>;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

test('restores the session using a bearer token and backend user response', async () => {
  localStorage.setItem('access_token', 'saved-token');
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ loggedIn: true, user: { email: 'test@example.com' } }) });
  vi.stubGlobal('fetch', fetchMock);
  render(<AuthProvider><Status /></AuthProvider>);
  expect(await screen.findByText('test@example.com')).toBeInTheDocument();
  expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer saved-token');
});

test.each([401, 422, 500])('handles backend status %s without discarding tokens on server errors', async status => {
  localStorage.setItem('access_token', 'saved-token');
  const fetchMock = vi.fn().mockResolvedValue({ ok: false, status });
  vi.stubGlobal('fetch', fetchMock);
  render(<AuthProvider><Status /></AuthProvider>);
  await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  await waitFor(() => expect(localStorage.getItem('access_token')).toBe(status === 500 ? 'saved-token' : null));
});
