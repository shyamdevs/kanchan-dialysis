const CONTENT_TYPES = new Set(['gallery', 'news', 'patients', 'trustees']);

export function validateType(type) {
  return CONTENT_TYPES.has(type);
}

export function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180) || `content-${Date.now()}`;
}

export function cleanPublicItem(item) {
  const value = item.toObject ? item.toObject() : { ...item };
  delete value.patientConsent;
  delete value.consentRecordedAt;
  delete value.createdBy;
  delete value.imagePublicId;
  return value;
}

// Media must be HTTPS: the public site is served over HTTPS, so browsers block
// plain-http images/videos as mixed content.
export function validOptionalHttpsUrl(value) {
  if (!value) return true;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

// Returns a valid Date, null for empty input, or undefined when the value
// cannot be parsed (so callers can reject it instead of crashing in Mongoose).
export function parseOptionalDate(value) {
  if (value === undefined || value === null || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
