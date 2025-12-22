import dbConnect from "../../../../lib/mongodb";
import PortfolioCard from "../../../../models/PortfolioCard";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const cards = await PortfolioCard.find({}).sort({ legacyId: 1 });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
