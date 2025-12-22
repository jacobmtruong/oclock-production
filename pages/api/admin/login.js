import { serialize } from "cookie";
import { signAdminToken } from "../../../lib/adminAuth";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({
      message: "Missing ADMIN_EMAIL/ADMIN_PASSWORD/JWT_SECRET in env",
    });
  }

  const ok = email === adminEmail && password === adminPassword;
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signAdminToken();

  res.setHeader(
    "Set-Cookie",
    serialize("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return res.status(200).json({ message: "Logged in" });
}
