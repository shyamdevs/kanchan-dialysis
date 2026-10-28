// Only approved gallery categories are displayed. Category filter buttons are
// generated dynamically from the published backend records in these categories.
const APPROVED_GALLERY_CATEGORIES = new Set([
  'centre facility',
  'dialysis care',
  'equipment',
  'community event',
  'health camp',
  'awareness programme',
  'centre celebration',
]);

export function normalizeGalleryCategory(category) {
  return typeof category === 'string'
    ? category.trim().replace(/\s+/g, ' ')
    : '';
}

export function getApprovedGalleryItems(records) {
  if (!Array.isArray(records)) return [];

  return records.filter((item) => {
    const category = normalizeGalleryCategory(item?.category).toLocaleLowerCase();
    return Boolean(item?.imageUrl) && APPROVED_GALLERY_CATEGORIES.has(category);
  });
}

export function getGalleryDescription(item) {
  return (
    item?.excerpt ||
    item?.description ||
    item?.introduction ||
    item?.content ||
    item?.body ||
    ''
  );
}

export function getGalleryTitle(item) {
  return item?.title || 'Shri Kanchan Dialysis Centre';
}
