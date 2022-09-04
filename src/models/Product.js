import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productType: { type: String },
    productTitle: { type: String, required: true },
    productCode: { type: String },
    arrImage: { type: Array, required: true },
    currentPrice: { type: Number, required: true },
    oldPrice: { type: Number },
    arrSize: { type: Array },
    contentHTML: { type: String, required: true },
    contentMarkdown: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
