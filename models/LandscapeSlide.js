import mongoose from "mongoose";

const LandscapeSlideSchema = new mongoose.Schema(
  {
    legacyId: Number,
    url: { type: String, required: true },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.LandscapeSlide ||
  mongoose.model("LandscapeSlide", LandscapeSlideSchema);
