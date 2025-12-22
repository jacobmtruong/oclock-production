import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";
import PortfolioCard from "../../../models/PortfolioCard";
import LandscapeSlide from "../../../models/LandscapeSlide";

import images from "../../../data/images";
import cards from "../../../data/portfolioCardsData";
import landscape from "../../../data/landscapeData";

export default async function handler(req, res) {
  await dbConnect();

  await Photo.deleteMany({});
  await PortfolioCard.deleteMany({});
  await LandscapeSlide.deleteMany({});

  await Photo.insertMany(
    images.map((i) => ({
      legacyId: i.id,
      url: i.url,
      content: i.content,
      category: i.category,
      view: i.view,
      favorite: i.favorite,
    }))
  );

  await PortfolioCard.insertMany(
    cards.map((c) => ({
      legacyId: c.id,
      url: c.url,
      content: c.content,
      slug: c.slug,
    }))
  );

  await LandscapeSlide.insertMany(
    landscape.map((l) => ({
      legacyId: l.id,
      url: l.url,
      content: l.content,
    }))
  );

  res.json({ ok: true });
}
