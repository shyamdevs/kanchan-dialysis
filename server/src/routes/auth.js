import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import Admin from "../models/Admin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// Only failed attempts count, so a legitimate admin is never locked out by
// their own successful sign-ins.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please wait and try again.",
  },
  keyGenerator: (req) => ipKeyGenerator(req.ip),
});

// Compared against when the email is unknown, so response time does not reveal
// which email addresses are registered.
const DUMMY_HASH =
  "$2b$12$JELLenjSUlWbkcxJbj4dvuhxWuD/sxsHdsx1qud2iPruf1PlHKc3q";

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || "");
    if (!email || !password || email.length > 254 || password.length > 300) {
      return res
        .status(400)
        .json({ message: "Enter your admin email and password." });
    }

    const admin = await Admin.findOne({ email }).select("+passwordHash");
    const valid = await bcrypt.compare(
      password,
      admin ? admin.passwordHash : DUMMY_HASH,
    );
    if (!admin || !valid)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect." });

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
      subject: String(admin._id),
      issuer: "kanchan-dialysis-cms",
      algorithm: "HS256",
      expiresIn: "8h",
    });
    await Admin.updateOne({ _id: admin._id }, { lastLoginAt: new Date() });
    return res.json({ admin: { email: admin.email }, token });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", requireAdmin, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("email");
    if (!admin)
      return res.status(401).json({ message: "Admin account not found." });
    return res.json({ admin: { email: admin.email } });
  } catch (error) {
    return next(error);
  }
});

// Sessions are stateless bearer tokens held by the browser; signing out simply
// means the browser discards the token.
router.post("/logout", (_req, res) => res.json({ success: true }));

export default router;
