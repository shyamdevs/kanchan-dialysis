import mongoose from "mongoose";

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["gallery", "news", "patients", "trustees"],
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },
    excerpt: { type: String, default: "", trim: true, maxlength: 600 },
    body: { type: String, default: "", maxlength: 20000 },
    description: { type: String, default: "", maxlength: 2000 },
    category: { type: String, default: "", trim: true, maxlength: 80 },
    imageUrl: { type: String, default: "", maxlength: 2000 },
    imagePublicId: { type: String, default: "" },
    mediaUrl: { type: String, default: "", maxlength: 2000 },
    mediaType: {
      type: String,
      enum: ["image", "video", "youtube", "none"],
      default: "image",
    },
    videoUrl: { type: String, default: "", maxlength: 2000 },
    author: { type: String, default: "", maxlength: 100 },
    date: { type: Date, default: null },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null },
    patientConsent: { type: Boolean, default: false },
    consentRecordedAt: { type: Date, default: null },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

contentItemSchema.index({ type: 1, slug: 1 }, { unique: true });
contentItemSchema.index({ type: 1, published: 1, publishedAt: -1 });

export default mongoose.model("ContentItem", contentItemSchema);
