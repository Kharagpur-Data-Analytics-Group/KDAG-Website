// Keep existing deployments using REACT_APP_* working during the Vite migration.
export const API_BASE_URL = (
  import.meta.env.VITE_FETCH_URL || import.meta.env.REACT_APP_FETCH_URL || '/api'
).replace(/\/+$/, '');

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || import.meta.env.REACT_APP_REDIRECT_URI || `${window.location.origin}/google-auth/callback`;
