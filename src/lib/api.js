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
// ---- Direct video upload (browser -> Cloudinary) ----------------------------
// Vercel limits request bodies to ~4.5 MB, far too small for video, so the
// server only signs the upload and the browser sends the file to Cloudinary.
function videoPosterUrl(url) {
  return url
    .replace('/video/upload/', '/video/upload/so_0,f_jpg,q_auto,w_1280/')
    .replace(/\.[a-z0-9]+(\?.*)?$/i, '.jpg');
}

// MP4 plays everywhere. MOV/WebM are converted to H.264 MP4 on delivery.
function videoPlayableUrl(url) {
  if (/\.mp4(\?.*)?$/i.test(url)) return url;
  return url
    .replace('/video/upload/', '/video/upload/f_mp4,vc_h264,q_auto/')
    .replace(/\.[a-z0-9]+(\?.*)?$/i, '.mp4');
}

export async function uploadVideoDirect(file, onProgress) {
  const sign = await apiRequest('/admin/upload/sign', { method: 'POST', body: JSON.stringify({}) });

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sign.apiKey);
  form.append('timestamp', String(sign.timestamp));
  form.append('signature', sign.signature);
  form.append('folder', sign.folder);
  form.append('allowed_formats', sign.allowedFormats);

  const data = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${sign.cloudName}/video/upload`);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      let body = {};
      try { body = JSON.parse(xhr.responseText); } catch { /* non-JSON error page */ }
      if (xhr.status >= 200 && xhr.status < 300 && body.secure_url) return resolve(body);
      // 401 from Cloudinary is not an expired admin session, so report it as a plain failure.
      const status = xhr.status === 401 ? 400 : xhr.status;
      reject(createApiError(body?.error?.message || 'Video upload failed. Please try again.', status));
    };
    xhr.onerror = () => reject(createApiError('Could not reach the upload service. Check your internet connection and try again.', 0));
    xhr.ontimeout = () => reject(createApiError('The video upload timed out. Try a smaller video or a faster connection.', 0));
    xhr.timeout = 15 * 60 * 1000;
    xhr.send(form);
  });

  return {
    url: videoPlayableUrl(data.secure_url),
    posterUrl: videoPosterUrl(data.secure_url),
    publicId: data.public_id,
  };
}
