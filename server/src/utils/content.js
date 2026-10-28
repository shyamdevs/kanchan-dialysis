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

export function validOptionalHttpsUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}
