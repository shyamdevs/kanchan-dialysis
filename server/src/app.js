import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { connectDatabase } from "./config/db.js";
import { bootstrapAdmin } from "./config/bootstrap.js";
import { createCors } from "./config/cors.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";

const PLACEHOLDER_SECRET = /replace-with|change-me|example-secret/i;

export function configProblem(env = process.env) {
  if (!env.MONGODB_URI) return "Server configuration error: MONGODB_URI is not set.";
  if (
    !env.JWT_SECRET ||
    env.JWT_SECRET.length < 32 ||
    PLACEHOLDER_SECRET.test(env.JWT_SECRET)
  )
    return "Server configuration error: JWT_SECRET must be a unique random value of at least 32 characters.";
  return "";
}

// Connect lazily (once per warm instance) instead of at import time. This is
// what makes the app work on serverless hosts, where there is no long-running
// "start-up" step and where a crash would produce a response with no CORS
// headers at all.
let readyPromise = null;
function ensureReady(_req, res, next) {
  const problem = configProblem();
  if (problem) {
    console.error(`[api] ${problem}`);
    return res.status(500).json({ message: problem });
  }
  if (mongoose.connection.readyState === 0) readyPromise = null; // dropped connection
  if (!readyPromise) {
    readyPromise = (async () => {
      await connectDatabase();
      await bootstrapAdmin({ strict: false });
    })().catch((error) => {
      readyPromise = null; // retry on the next request
      throw error;
    });
  }
  readyPromise.then(
    () => next(),
    (error) => {
      console.error("[api] Database unavailable:", error?.message || error);
      res.status(503).json({
        message: "The content service is temporarily unavailable. Please try again shortly.",
      });
    },
  );
}

export function createApp() {
  const app = express();
  const behindProxy =
    process.env.TRUST_PROXY === "true" || Boolean(process.env.VERCEL);

  app.disable("x-powered-by");
  app.set("trust proxy", behindProxy ? 1 : false);
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  // CORS must come first so that EVERY response (including 4xx/5xx and rate
  // limit errors) carries the headers, and so preflight (OPTIONS) requests are
  // answered immediately without touching the database or the rate limiter.
  app.use(createCors());

  app.use(express.json({ limit: "200kb" }));
  app.use(
    "/api",
    rateLimit({
      windowMs: 60 * 1000,
      limit: 180,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      keyGenerator: (req) => ipKeyGenerator(req.ip),
      message: { message: "Too many requests. Please slow down and try again." },
    }),
  );

  app.get("/", (_req, res) => {
    res.send("Shri Kanchan Dialysis CMS API is running.");
  });

  // Health check works without a database so deployment problems are diagnosable.
  app.get("/api/health", (_req, res) =>
    res.json({
      ok: true,
      service: "kanchan-dialysis-cms",
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      configured: !configProblem(),
    }),
  );

  app.use("/api", ensureReady);
  app.use("/api/auth", authRoutes);
  app.use("/api", contentRoutes);
  app.use("/api/admin/upload", uploadRoutes);

  app.use((_req, res) => res.status(404).json({ message: "Resource not found." }));
  app.use((error, _req, res, _next) => {
    if (error?.type === "entity.parse.failed")
      return res.status(400).json({ message: "The request body is not valid JSON." });
    if (error?.type === "entity.too.large")
      return res.status(413).json({ message: "Request is too large." });
    if (error?.name === "ValidationError")
      return res.status(400).json({ message: "Please check the submitted content fields." });
    if (error?.name === "CastError")
      return res.status(400).json({ message: "One of the submitted values is invalid." });
    if (error?.code === 11000)
      return res.status(409).json({ message: "A content item with this slug already exists." });
    console.error("[api-error]", error?.message || error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  });

  return app;
}

export default createApp();
