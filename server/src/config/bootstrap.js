import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const PLACEHOLDER_PASSWORD = /replace-with|change-me|example-password/i;

/**
 * Creates the initial administrator if one does not exist yet.
 * With `strict: true` (local start-up) configuration problems throw.
 * With `strict: false` (serverless) they are logged and skipped, so existing
 * admins can still sign in even if the bootstrap variables are not set.
 */
export async function bootstrapAdmin({ strict = true } = {}) {
  const email = String(process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "");

  const problem = !email || !password
    ? "ADMIN_EMAIL and ADMIN_PASSWORD are required. Configure them in server/.env."
    : email === "admin@example.com" || PLACEHOLDER_PASSWORD.test(password)
      ? "Replace the example administrator credentials in server/.env before starting the API."
      : password.length < 12
        ? "ADMIN_PASSWORD must be at least 12 characters."
        : "";

  if (problem) {
    if (strict) throw new Error(problem);
    console.warn(`[cms] Admin bootstrap skipped: ${problem}`);
    return;
  }

  const existing = await Admin.exists({ email });
  if (existing) return;
  const passwordHash = await bcrypt.hash(password, 12);
  try {
    await Admin.create({ email, passwordHash });
    console.log(`[cms] Initial administrator created for ${email}.`);
  } catch (error) {
    // Two cold starts can race; the unique index makes the loser a no-op.
    if (error?.code !== 11000) throw error;
  }
}
