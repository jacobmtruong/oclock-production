import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    legacyId: Number,
    url: { type: String, required: true },
    content: { type: String, default: "" },
    favorite: { type: Boolean, default: false },

    category: {
      type: String,
      required: true,
      enum: ["food", "beverage", "product", "architecture", "lifestyle"],
    },
    view: { type: String, required: true, enum: ["landscape", "portrait"] },

    boardKey: {
      type: String,
      enum: ["fnb", "product", "architecture", "lifestyle", null],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
