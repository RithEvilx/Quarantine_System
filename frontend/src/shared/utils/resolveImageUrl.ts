import { APP_API_URL } from "@/app/configs/app";

export const resolveImageUrl = (raw?: string | null): string => {
  if (!raw) return "";

  // Normalize backslashes and trim spaces
  let path = raw.replace(/\\/g, "/").trim();

  // If backend already returns full URL (http/https), just use it
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Normalize base API URL (remove trailing slashes)
  const base = APP_API_URL.replace(/\/+$/, "");

  // Ensure leading slash on the path
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  // Combine base + path
  return `${base}${path}`;
};
