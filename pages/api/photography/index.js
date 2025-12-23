import dbConnect from "../../../lib/mongodb";
import Photo from "../../../../models/Photo";

export default async function handler(req, res) {
  const { category } = req.query;
  await dbConnect();

  const landscape = await Photo.find({ category, view: "landscape" });
  const portrait = await Photo.find({ category, view: "portrait" });

  res.json({ landscape, portrait });
}
