import jwt from "jsonwebtoken";

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function isAdminFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.role === "admin";
  } catch {
    return false;
  }
}
