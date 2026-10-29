import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import AppRouter from './AppRouter';

// Exercise real page imports without canvas, animation, or unrelated shell UI.
vi.mock('../components/Common/Particles/Particless', () => ({ default: () => null }));
vi.mock('../components/Common/Motion/Fade.jsx', () => ({ default: ({ children }) => <>{children}</> }));
vi.mock('../components/Common/Navbar/Navbar.jsx', () => ({
  default: () => <nav aria-label="Main"><Link to="/blogs">Blog</Link><Link to="/events">Events</Link></nav>,
}));
vi.mock('../components/Common/Footer/Footer.jsx', () => ({ default: () => <footer>Site footer</footer> }));
vi.mock('../components/Common/Logout/Logout.jsx', () => ({ default: () => null }));

test('loads a deep-linked page and navigates to another lazy page while keeping the shell', async () => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  window.history.replaceState({}, '', '/blogs');
  const user = userEvent.setup();
  render(<AppRouter />);

  expect(await screen.findByText('BLOG')).toBeInTheDocument();
  const navigation = screen.getByRole('navigation', { name: 'Main' });
  expect(screen.getByText('Site footer')).toBeInTheDocument();

  await user.click(screen.getByRole('link', { name: 'Events' }));
  expect(await screen.findByText('EVENTS')).toBeInTheDocument();
  expect(screen.queryByText('BLOG')).not.toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Main' })).toBe(navigation);
  expect(window.location.pathname).toBe('/events');
  vi.restoreAllMocks();
});
