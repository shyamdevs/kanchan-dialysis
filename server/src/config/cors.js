import cors from "cors";

// Frontends that are always allowed to call this API. Additional origins can
// be added with FRONTEND_URL / ALLOWED_ORIGINS (comma-separated) without a
// code change.
const DEFAULT_ORIGINS = ["https://kanchan-dialysis-ggyk.vercel.app"];
const DEV_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

/**
 * Reduce a URL-ish value to a bare, lower-cased origin so that values such as
 * "https://site.vercel.app/" (trailing slash) or "https://Site.vercel.app/x"
 * still match the browser's Origin header ("https://site.vercel.app").
 */
export function normalizeOrigin(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  try {
    return new URL(text).origin.toLowerCase();
  } catch {
    return null;
  }
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function buildAllowedOrigins(env = process.env) {
  const configured = [
    ...DEFAULT_ORIGINS,
    ...splitList(env.FRONTEND_URL),
    ...splitList(env.ALLOWED_ORIGINS),
    ...(env.NODE_ENV !== "production" ? DEV_ORIGINS : []),
  ];
  return new Set(configured.map(normalizeOrigin).filter(Boolean));
}

export function createCors(env = process.env) {
  const allowedOrigins = buildAllowedOrigins(env);
  return cors({
    // Auth uses an Authorization header, not cookies, so credentials are not
    // needed (this also keeps the API safe from cross-site request forgery).
    credentials: false,
    // Never throw for an unknown origin: simply omit the CORS headers so the
    // browser blocks it, instead of returning an error response.
    origin(origin, callback) {
      if (!origin) return callback(null, true); // curl, health checks, server-to-server
      return callback(null, allowedOrigins.has(origin.toLowerCase()));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
    optionsSuccessStatus: 204,
  });
}
