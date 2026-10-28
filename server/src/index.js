import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
import { connectDatabase } from "./config/db.js";
import Admin from "./models/Admin.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    ...(process.env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => value.trim()),
    ...(process.env.NODE_ENV !== "production"
      ? ["http://localhost:5173", "http://127.0.0.1:5173"]
      : []),
  ].filter(Boolean),
);

app.disable("x-powered-by");
app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS."));
    },
  }),
);
app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());
app.use(
  "/api",
  rateLimit({
    windowMs: 60 * 1000,
    limit: 180,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);
app.get("/", (_req, res) => {
  res.send("Shri Kanchan Dialysis CMS API is running.");
});

app.get("/api/health", (_req, res) =>
  res.json({
    ok: true,
    service: "kanchan-dialysis-cms",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("/api/admin/upload", uploadRoutes);

app.use((req, res) => res.status(404).json({ message: "Resource not found." }));
app.use((error, _req, res, _next) => {
  if (error?.message === "Origin is not allowed by CORS.")
    return res.status(403).json({ message: "This origin is not allowed." });
  if (error?.name === "ValidationError")
    return res
      .status(400)
      .json({ message: "Please check the submitted content fields." });
  if (error?.code === 11000)
    return res
      .status(409)
      .json({ message: "A content item with this slug already exists." });
  if (error?.type === "entity.too.large")
    return res.status(413).json({ message: "Request is too large." });
  console.error("[api-error]", error?.message || error);
  return res
    .status(500)
    .json({ message: "Something went wrong. Please try again." });
});

async function bootstrapAdmin() {
  const email = String(process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "");
  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required. Configure them in server/.env.",
    );
  }
  if (
    email === "admin@example.com" ||
    /replace-with|change-me|example-password/i.test(password)
  ) {
    throw new Error(
      "Replace the example administrator credentials in server/.env before starting the API.",
    );
  }
  if (password.length < 12)
    throw new Error("ADMIN_PASSWORD must be at least 12 characters.");
  const existing = await Admin.findOne({ email });
  if (existing) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash });
  console.log(`[cms] Initial administrator created for ${email}.`);
}

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET.length < 32 ||
  /replace-with|change-me|example-secret/i.test(process.env.JWT_SECRET)
) {
  console.error(
    "[api] Replace the example JWT_SECRET with a unique random secret of at least 32 characters.",
  );
  process.exit(1);
}

connectDatabase()
  .then(bootstrapAdmin)
  .then(() =>
    app.listen(port, () =>
      console.log(`[api] Kanchan Dialysis CMS API listening on port ${port}.`),
    ),
  )
  .catch((error) => {
    console.error(`[api] Startup failed: ${error.message}`);
    process.exit(1);
  });

export default app;
