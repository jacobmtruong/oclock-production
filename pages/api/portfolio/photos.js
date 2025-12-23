import dbConnect from "../../../lib/mongodb";
import Photo from "../../../models/Photo";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const photos = await Photo.find({}).sort({ legacyId: 1, createdAt: 1 });

    return res.status(200).json(photos);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
