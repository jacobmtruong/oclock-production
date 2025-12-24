import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";
import PortfolioCard from "../../../models/PortfolioCard";
import LandscapeSlide from "../../../models/LandscapeSlide";

import images from "../../../data/images";
import cards from "../../../data/portfolioCardsData";
import landscape from "../../../data/landscapeData";

function pickBoardKeysFromImages(imgs) {
  // Pick one thumbnail per slot
  const fnb =
    imgs.find((i) => i.category === "food") ||
    imgs.find((i) => i.category === "beverage");

  const product = imgs.find((i) => i.category === "product");
  const architecture = imgs.find((i) => i.category === "architecture");
  const lifestyle = imgs.find((i) => i.category === "lifestyle");

  // Map legacyId -> boardKey
  const map = new Map();
  if (fnb?.id) map.set(fnb.id, "fnb");
  if (product?.id) map.set(product.id, "product");
  if (architecture?.id) map.set(architecture.id, "architecture");
  if (lifestyle?.id) map.set(lifestyle.id, "lifestyle");

  return map;
}

export default async function handler(req, res) {
  // allow GET for convenience (so you can click it)
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const force = req.query.force === "1";

    // (optional) safety: don't wipe unless force=1
    if (!force) {
      const count = await Photo.countDocuments();
      if (count > 0) {
        return res.status(400).json({
          ok: false,
          message: "DB not empty. Use /api/seed/portfolio?force=1 to reseed.",
        });
      }
    }

    // wipe (same as your working version)
    await Photo.deleteMany({});
    await PortfolioCard.deleteMany({});
    await LandscapeSlide.deleteMany({});

    // NEW: set boardKey for 4 selected thumbnails
    const boardMap = pickBoardKeysFromImages(images);

    await Photo.insertMany(
      images
        .filter((i) => i && i.url)
        .map((i) => ({
          legacyId: i.id,
          url: i.url,
          content: i.content || "",
          category: i.category,
          view: i.view,
          favorite: !!i.favorite,
          boardKey: boardMap.get(i.id) || null, // ✅ added
        }))
    );

    await PortfolioCard.insertMany(
      cards
        .filter((c) => c && c.url)
        .map((c) => ({
          legacyId: c.id,
          url: c.url,
          content: c.content || "",
          slug: c.slug,
        }))
    );

    await LandscapeSlide.insertMany(
      landscape
        .filter((l) => l && l.url)
        .map((l) => ({
          legacyId: l.id,
          url: l.url,
          content: l.content || "",
        }))
    );

    // verify 4 board keys exist
    const thumbs = await Photo.find({ boardKey: { $ne: null } })
      .select("boardKey url category")
      .lean();

    return res.json({ ok: true, thumbs });
  } catch (err) {
    console.error("seed error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
