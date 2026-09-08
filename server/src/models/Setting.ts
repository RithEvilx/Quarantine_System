import { Schema, model } from "mongoose";

const settingSchema = new Schema({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: Number, required: true, min: 1 },
}, { timestamps: true });

export const Setting = model("Setting", settingSchema);