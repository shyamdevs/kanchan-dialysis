import { Router } from "express";
import mongoose from "mongoose";
import ContentItem from "../models/ContentItem.js";
import { requireAdmin } from "../middleware/auth.js";
import {
  cleanPublicItem,
  slugify,
  validOptionalHttpsUrl,
  validateType,
} from "../utils/content.js";

const router = Router();
const MAX_TEXT = 20000;
const GALLERY_CATEGORIES = new Set([
  "Centre Facility",
  "Dialysis Care",
  "Equipment",
  "Community Event",
  "Health Camp",
  "Awareness Programme",
  "Centre Celebration",
]);

function fail(res, message, status = 400) {
  return res.status(status).json({ message });
}
function normalizePayload(body, type, createdBy) {
  const title = String(body?.title || "").trim();
  if (!title) throw new Error("Title is required.");
  if (title.length > 180)
    throw new Error("Title must be 180 characters or fewer.");
  const imageUrl = String(body?.imageUrl || "").trim();
  const mediaUrl = String(body?.mediaUrl || "").trim();
  const videoUrl = String(body?.videoUrl || "").trim();
  for (const url of [imageUrl, mediaUrl, videoUrl])
    if (!validOptionalHttpsUrl(url))
      throw new Error("Media URLs must be valid HTTP or HTTPS links.");
  const published = body?.published === true || body?.published === "true";
  const patientConsent =
    body?.patientConsent === true || body?.patientConsent === "true";
  const category = String(body?.category || "")
    .trim()
    .slice(0, 80);
  if (type === "patients" && published && !patientConsent)
    throw new Error(
      "Documented consent is required before publishing patient content.",
    );
  if (type === "gallery" && published && !GALLERY_CATEGORIES.has(category))
    throw new Error(
      "Choose an approved hospital, dialysis, equipment, or community-event gallery category before publishing.",
    );
  if (type === "trustees" && published && !imageUrl)
    throw new Error(
      "Add a verified trustee portrait or image before publishing this profile.",
    );
  return {
    type,
    title,
    slug: slugify(body?.slug || title),
    excerpt: String(body?.excerpt || "")
      .trim()
      .slice(0, 600),
    body: String(body?.body || "")
      .trim()
      .slice(0, MAX_TEXT),
    description: String(body?.description || "")
      .trim()
      .slice(0, 2000),
    category,
    imageUrl,
    imagePublicId: String(body?.imagePublicId || "").trim(),
    mediaUrl,
    mediaType: ["image", "video", "youtube", "none"].includes(body?.mediaType)
      ? body.mediaType
      : imageUrl
        ? "image"
        : "none",
    videoUrl,
    author: String(body?.author || "")
      .trim()
      .slice(0, 100),
    date: body?.date ? new Date(body.date) : null,
    published,
    publishedAt: published
      ? body?.publishedAt
        ? new Date(body.publishedAt)
        : new Date()
      : null,
    patientConsent,
    consentRecordedAt:
      type === "patients" && patientConsent ? new Date() : null,
    ...(createdBy ? { createdBy } : {}),
  };
}

router.get("/public/:type", async (req, res, next) => {
  try {
    const { type } = req.params;
    if (!validateType(type)) return fail(res, "Unknown content type.", 404);
    const now = new Date();
    const filter = {
      type,
      published: true,
      $or: [{ publishedAt: null }, { publishedAt: { $lte: now } }],
    };
    // Patient images/stories are public only when the admin has explicitly recorded consent.
    if (type === "patients") filter.patientConsent = true;
    if (type === "trustees") filter.imageUrl = { $ne: "" };
    const items = await ContentItem.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(100)
      .lean();
    return res.json({ items: items.map(cleanPublicItem) });
  } catch (error) {
    return next(error);
  }
});

router.get("/public/news/:slug", async (req, res, next) => {
  try {
    const slug = decodeURIComponent(req.params.slug);
    const item = await ContentItem.findOne({
      type: "news",
      slug,
      published: true,
      $or: [{ publishedAt: null }, { publishedAt: { $lte: new Date() } }],
    });
    if (!item) return fail(res, "News item not found.", 404);
    return res.json({ item: cleanPublicItem(item) });
  } catch (error) {
    return next(error);
  }
});

router.get("/admin/content/:type", requireAdmin, async (req, res, next) => {
  try {
    const { type } = req.params;
    if (!validateType(type)) return fail(res, "Unknown content type.", 404);
    const items = await ContentItem.find({ type })
      .sort({ updatedAt: -1 })
      .limit(250)
      .lean();
    return res.json({ items });
  } catch (error) {
    return next(error);
  }
});

router.post("/admin/content/:type", requireAdmin, async (req, res, next) => {
  try {
    const { type } = req.params;
    if (!validateType(type)) return fail(res, "Unknown content type.", 404);
    let payload;
    try {
      payload = normalizePayload(
        req.body,
        type,
        new mongoose.Types.ObjectId(req.admin.id),
      );
    } catch (error) {
      return fail(res, error.message);
    }
    const slugExists = await ContentItem.exists({ type, slug: payload.slug });
    if (slugExists) payload.slug = `${payload.slug}-${Date.now().toString(36)}`;
    const item = await ContentItem.create(payload);
    return res.status(201).json({ item });
  } catch (error) {
    return next(error);
  }
});

router.put("/admin/content/:type/:id", requireAdmin, async (req, res, next) => {
  try {
    const { type, id } = req.params;
    if (!validateType(type)) return fail(res, "Unknown content type.", 404);
    if (!mongoose.isValidObjectId(id)) return fail(res, "Invalid content id.");
    const existing = await ContentItem.findOne({ _id: id, type });
    if (!existing) return fail(res, "Content not found.", 404);
    const input = { ...existing.toObject(), ...req.body };
    if (
      type === "patients" &&
      existing.patientConsent &&
      input.patientConsent === false
    ) {
      input.published = false;
      input.publishedAt = null;
    }
    let payload;
    try {
      payload = normalizePayload(input, type);
    } catch (error) {
      return fail(res, error.message);
    }
    const conflict = await ContentItem.exists({
      type,
      slug: payload.slug,
      _id: { $ne: existing._id },
    });
    if (conflict) payload.slug = `${payload.slug}-${Date.now().toString(36)}`;
    Object.assign(existing, payload, { createdBy: existing.createdBy });
    await existing.save();
    return res.json({ item: existing });
  } catch (error) {
    return next(error);
  }
});

router.delete(
  "/admin/content/:type/:id",
  requireAdmin,
  async (req, res, next) => {
    try {
      const { type, id } = req.params;
      if (!validateType(type)) return fail(res, "Unknown content type.", 404);
      if (!mongoose.isValidObjectId(id))
        return fail(res, "Invalid content id.");
      const result = await ContentItem.deleteOne({ _id: id, type });
      if (!result.deletedCount) return fail(res, "Content not found.", 404);
      return res.json({ success: true });
    } catch (error) {
      return next(error);
    }
  },
);

export default router;
