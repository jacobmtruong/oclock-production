import mongoose from "mongoose";

const PortfolioCardSchema = new mongoose.Schema(
  {
    legacyId: Number,
    url: { type: String, required: true },
    content: { type: String, default: "" },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PortfolioCard ||
  mongoose.model("PortfolioCard", PortfolioCardSchema);
