import dbConnect from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await dbConnect();
    return res.status(200).json({ ok: true, message: "MongoDB connected!" });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
