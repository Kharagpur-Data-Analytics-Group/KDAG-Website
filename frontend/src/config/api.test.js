import { afterEach, expect, test, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function config(env = {}) {
  for (const key of ['VITE_FETCH_URL', 'REACT_APP_FETCH_URL', 'VITE_GOOGLE_CLIENT_ID', 'REACT_APP_GOOGLE_CLIENT_ID', 'VITE_REDIRECT_URI', 'REACT_APP_REDIRECT_URI']) {
    vi.stubEnv(key, env[key] || '');
  }
  return import('./api.js');
}

test('uses the local API proxy without environment configuration', async () => {
  expect((await config()).API_BASE_URL).toBe('/api');
});

test('supports the existing React environment configuration', async () => {
  const result = await config({ REACT_APP_FETCH_URL: 'https://backend.example.com/', REACT_APP_GOOGLE_CLIENT_ID: 'legacy-client', REACT_APP_REDIRECT_URI: 'https://site.example.com/google-auth/callback' });
  expect(result.API_BASE_URL).toBe('https://backend.example.com');
  expect(result.GOOGLE_CLIENT_ID).toBe('legacy-client');
  expect(result.GOOGLE_REDIRECT_URI).toBe('https://site.example.com/google-auth/callback');
});

test('prefers Vite settings over legacy settings', async () => {
  const result = await config({ VITE_FETCH_URL: '/api/', REACT_APP_FETCH_URL: 'https://old.example.com', VITE_GOOGLE_CLIENT_ID: 'new-client', REACT_APP_GOOGLE_CLIENT_ID: 'old-client' });
  expect(result.API_BASE_URL).toBe('/api');
  expect(result.GOOGLE_CLIENT_ID).toBe('new-client');
});
