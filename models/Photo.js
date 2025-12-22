import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    legacyId: Number,
    url: { type: String, required: true },
    content: { type: String, default: "" },
    category: { type: String, required: true },
    view: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
