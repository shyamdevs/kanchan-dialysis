export function formatNewsDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export function getNewsTitle(item) {
  return item?.title?.trim() || "Centre news update";
}

export function getNewsSummary(item) {
  return item?.excerpt || item?.introduction || "";
}

export function getNewsBody(item) {
  return item?.body || item?.description || item?.content || "";
}

export function getNewsDateValue(item) {
  return item?.publishedAt || item?.date || item?.createdAt || "";
}

export function getNewsMediaUrl(item) {
  return item?.mediaUrl || item?.videoUrl || "";
}

export function isYouTubeNews(item) {
  return String(item?.mediaType || "").toLowerCase() === "youtube";
}

export function isVideoNews(item) {
  return String(item?.mediaType || "").toLowerCase() === "video";
}

// getPublishedContent('news') supplies published CMS records. This function only
// normalizes that response; it does not create static/sample news entries.
export function getPublishedNewsItems(records) {
  if (!Array.isArray(records)) return [];
  return records.filter((item) => item && typeof item === "object");
}

export function getNewsCategories(items) {
  const labels = new Map();

  items.forEach((item) => {
    const label =
      typeof item?.category === "string" ? item.category.trim() : "";
    const key = label.toLocaleLowerCase();
    if (label && !labels.has(key)) labels.set(key, label);
  });

  return Array.from(labels, ([key, label]) => ({ key, label })).sort((a, b) =>
    a.label.localeCompare(b.label, "en", { sensitivity: "base" }),
  );
}

export function normalizeNewsCategory(category) {
  return typeof category === "string"
    ? category.trim().toLocaleLowerCase()
    : "";
}
