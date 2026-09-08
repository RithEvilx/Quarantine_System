import { Schema, model } from "mongoose";

const productSchema = new Schema({
  id: { type: Number, unique: true, index: true }, name: { type: String, required: true, index: true }, slug: { type: String, required: true, unique: true, index: true }, description: String, price: { type: Number, required: true, min: 0 }, priceUsd: { type: Number, min: 0 }, priceKhr: { type: Number, min: 0 }, categoryId: { type: Number, index: true }, categoryType: String, stock: { type: Number, default: 0, min: 0 }, image: String, blurhash: String, tags: [String], isActive: { type: Boolean, default: true, index: true }, created: { timestamp: { type: Date, default: Date.now } }, modified: { timestamp: Date }, createdBy: Number, modifiedBy: Number,
}, { timestamps: true });

export const Product = model("Product", productSchema);