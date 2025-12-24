import dbConnect from "../../../../lib/mongodb";
import Photo from "../../../../models/Photo";

const LABELS = {
  fnb: "Food & Beverage",
  product: "Product",
  architecture: "Architecture",
  lifestyle: "Lifestyle",
};

const ORDER = ["fnb", "product", "architecture", "lifestyle"];

export default async function handler(req, res) {
  try {
    await dbConnect();

    // 1) photos explicitly selected as thumbnails
    const picked = await Photo.find({ boardKey: { $ne: null } })
      .select("url boardKey content")
      .lean();

    const map = {};
    for (const p of picked) {
      if (p?.boardKey && p?.url && !map[p.boardKey]) {
        map[p.boardKey] = p;
      }
    }

    // 2) fallback if a slot is not selected yet
    const ensure = async (key, query) => {
      if (map[key]) return;
      const p = await Photo.findOne({
        ...query,
        url: { $exists: true, $ne: "" },
      })
        .sort({ createdAt: -1 })
        .select("url content")
        .lean();
      if (p?.url) map[key] = { ...p, boardKey: key };
    };

    await ensure("fnb", { category: { $in: ["food", "beverage"] } });
    await ensure("product", { category: "product" });
    await ensure("architecture", { category: "architecture" });
    await ensure("lifestyle", { category: "lifestyle" });

    // 3) build cards (skip missing slots so we never return {})
    const cards = ORDER.filter((k) => map[k]?.url).map((p) => ({
      _id: p._id,
      slug: p.boardKey, // fnb/product/architecture/lifestyle
      url: p.url,
      content: LABELS[p.boardKey] || p.content || p.boardKey,
    }));

    // If none found, tell you why (instead of {} objects)
    if (cards.length === 0) {
      const count = await Photo.countDocuments({});
      return res.status(200).json({
        ok: false,
        message:
          count === 0
            ? "No photos in MongoDB yet. Add photos in /admin/photos first."
            : "Photos exist but none match categories (food/beverage/product/architecture/lifestyle) or url is empty.",
      });
    }

    // If you expect 4 always, this tells you what's missing
    if (cards.length < 4) {
      return res.status(200).json({
        ok: true,
        warning: "Not all 4 thumbnails are set/found yet.",
        found: cards,
        missingSlots: ORDER.filter((k) => !map[k]?.url),
      });
    }

    return res.status(200).json(cards);
  } catch (err) {
    console.error("portfoliocards error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
