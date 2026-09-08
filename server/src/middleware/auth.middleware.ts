import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const requireAdmin: RequestHandler = (req, res, next) => {
  const token = req.cookies?.access_token as string | undefined;
  if (!token) {
    res.status(401).json({ header: { serverTimeStamp: Date.now(), result: false, statusCode: 401, message: "Authentication required." }, body: null });
    return;
  }
  try {
    jwt.verify(token, env.accessSecret);
    next();
  } catch {
    res.status(401).json({ header: { serverTimeStamp: Date.now(), result: false, statusCode: 401, message: "Session expired." }, body: null });
  }
};