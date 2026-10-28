import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import Admin from "../models/Admin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please wait and try again.",
  },
  keyGenerator: (req) => ipKeyGenerator(req.ip),
});
function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 8 * 60 * 60 * 1000,
  };
}



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
    const valid = admin
      ? await bcrypt.compare(password, admin.passwordHash)
      : false;
    if (!valid)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect." });

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
      subject: String(admin._id),
      issuer: "kanchan-dialysis-cms",
      expiresIn: "8h",
    });
    admin.lastLoginAt = new Date();
    await admin.save();
    res.cookie("kanchan_admin", token, cookieOptions());
    return res.json({ admin: { email: admin.email } });
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

router.post("/logout", (_req, res) => {
  res.clearCookie("kanchan_admin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  return res.json({ success: true });
});

export default router;
