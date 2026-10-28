const configuredBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE = configuredBase.replace(/\/$/, '');

const TOKEN_KEY = 'kanchan_admin_token';
const REQUEST_TIMEOUT_MS = 30000;

// The admin session token lives in sessionStorage (cleared when the tab closes).
// A bearer token is used instead of a cookie because the website and the API
// are on different *.vercel.app sites, and browsers block cross-site cookies.
export function getAuthToken() {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setAuthToken(token) {
  try {
    if (token) window.sessionStorage.setItem(TOKEN_KEY, token);
    else window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage can be unavailable (private mode); the session then lasts until reload.
  }
}

export function clearAuthToken() {
  setAuthToken('');
}

function createApiError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function apiRequest(path, options = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Public content and sign-in are anonymous. Not sending Authorization there
  // keeps public reads "simple" CORS requests (no extra preflight round trip).
  const isAnonymous = normalizedPath.startsWith('/public') || normalizedPath === '/auth/login';
  const token = getAuthToken();
  if (token && !isAnonymous && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${API_BASE}${normalizedPath}`, {
      ...options,
      headers,
      credentials: 'omit',
      signal: controller.signal,
    });
  } catch {
    throw createApiError('Could not reach the content service. Please try again later.', 0);
  } finally {
    clearTimeout(timer);
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallback =
      response.status === 413
        ? 'That file is too large to upload. Please choose a smaller file or paste an HTTPS media URL.'
        : `Request failed (${response.status}).`;
    throw createApiError(payload.message || fallback, response.status);
  }
  return payload;
}

export async function getPublishedContent(type) {
  const result = await apiRequest(`/public/${encodeURIComponent(type)}`);
  return Array.isArray(result.items) ? result.items : [];
}