const configuredBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE = configuredBase.replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path.startsWith('/') ? path : `/${path}`}`, {
      ...options,
      headers,
      credentials: 'include',
    });
  } catch {
    throw new Error('Could not reach the content service. Please try again later.');
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || `Request failed (${response.status}).`);
  }
  return payload;
}

export async function getPublishedContent(type) {
  const result = await apiRequest(`/public/${encodeURIComponent(type)}`);
  return Array.isArray(result.items) ? result.items : [];
}
