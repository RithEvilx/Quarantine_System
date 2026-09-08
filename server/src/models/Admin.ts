import { Schema, model } from "mongoose";
const adminSchema = new Schema({ username: { type: String, unique: true, index: true }, passwordHash: String, role: { type: String, default: "admin" }, isActive: { type: Boolean, default: true } }, { timestamps: true });
export const Admin = model("Admin", adminSchema);