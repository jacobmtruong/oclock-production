// pages/api/photography/portfoliocards.js
import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";

const CARD_META = [
  { boardKey: "fnb", label: "Food & Beverage", slug: "fnb" },
  { boardKey: "product", label: "Product", slug: "product" },
  { boardKey: "architecture", label: "Architecture", slug: "architecture" },
  { boardKey: "lifestyle", label: "Lifestyle", slug: "lifestyle" },
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    // pull the 4 chosen thumbnails from Photo collection
    const thumbs = await Photo.find({
      boardKey: { $in: CARD_META.map((x) => x.boardKey) },
    })
      .select("url content boardKey")
      .lean();

    const map = {};
    for (const t of thumbs) map[t.boardKey] = t;

    // always return 4 cards (even if some missing)
    const cards = CARD_META.map((c) => ({
      slug: c.slug,
      content: c.label,
      url: map[c.boardKey]?.url || "",
      boardKey: c.boardKey,
    }));

    return res.status(200).json(cards);
  } catch (err) {
    console.error("GET /api/photography/portfoliocards error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
