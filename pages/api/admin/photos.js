import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";
import { isAdminFromToken } from "../../../lib/adminAuth";

export default async function handler(req, res) {
  // ✅ protect all admin photo actions
  const token = req.cookies?.admin_token || "";
  if (!isAdminFromToken(token)) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  await dbConnect();

  // GET: list all photos
  if (req.method === "GET") {
    const photos = await Photo.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json(photos);
  }

  // POST: add photo
  if (req.method === "POST") {
    const { url, content, category, view, favorite } = req.body || {};
    if (!url)
      return res.status(400).json({ ok: false, message: "Missing url" });

    const created = await Photo.create({
      url,
      content: content || "",
      category,
      view,
      favorite: !!favorite,
    });

    return res.status(201).json({ ok: true, photo: created });
  }

  // DELETE: remove photo
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ ok: false, message: "Missing id" });

    await Photo.findByIdAndDelete(id);
    return res.status(200).json({ ok: true });
  }

  // ✅ PATCH: assign/unassign thumbnail slot
  if (req.method === "PATCH") {
    const { id, boardKey } = req.body || {};
    if (!id) return res.status(400).json({ ok: false, message: "Missing id" });

    const allowed = [null, "", "fnb", "product", "architecture", "lifestyle"];
    if (!allowed.includes(boardKey)) {
      return res.status(400).json({ ok: false, message: "Invalid boardKey" });
    }

    // clear existing slot owner
    if (boardKey) {
      await Photo.updateMany({ boardKey }, { $set: { boardKey: null } });
    }

    const updated = await Photo.findByIdAndUpdate(
      id,
      { $set: { boardKey: boardKey || null } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ ok: false, message: "Photo not found" });
    }

    // ✅ return the updated document including boardKey
    return res.status(200).json({ ok: true, photo: updated });
  }

  // fallback
  res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
  return res.status(405).json({ ok: false, message: "Method not allowed" });
}
