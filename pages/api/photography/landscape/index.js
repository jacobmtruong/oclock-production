import dbConnect from "../../../../lib/mongodb";
import LandscapeSlide from "../../../../models/LandscapeSlide";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const slides = await LandscapeSlide.find({}).sort({ legacyId: 1 });
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
