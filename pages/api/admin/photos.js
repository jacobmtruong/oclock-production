import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";
import { isAdminFromToken } from "../../../lib/adminAuth";

function getCookie(req, name) {
  const cookies = req.headers.cookie || "";
  const parts = cookies.split(";").map((c) => c.trim());
  const found = parts.find((c) => c.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.split("=").slice(1).join("=")) : "";
}

function requireAdmin(req, res) {
  const token = getCookie(req, "admin_token");
  const ok = token && isAdminFromToken(token);
  if (!ok) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
}

const VALID_CATEGORIES = [
  "food",
  "beverage",
  "product",
  "architecture",
  "lifestyle",
];
const VALID_VIEWS = ["landscape", "portrait"];

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  await dbConnect();

  // ✅ GET: list all photos (admin table)
  if (req.method === "GET") {
    const photos = await Photo.find({}).sort({ createdAt: -1 });
    return res.status(200).json(photos);
  }

  // ✅ POST: create photo
  if (req.method === "POST") {
    const { url, content, category, view, favorite } = req.body;

    if (!url || !category || !view) {
      return res
        .status(400)
        .json({ message: "Missing fields: url, category, view" });
    }
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (!VALID_VIEWS.includes(view)) {
      return res.status(400).json({ message: "Invalid view" });
    }

    const created = await Photo.create({
      url,
      content: content || "",
      category,
      view,
      favorite: !!favorite,
    });

    return res.status(201).json(created);
  }

  // ✅ DELETE: delete by id in query string
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Missing id" });

    await Photo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
