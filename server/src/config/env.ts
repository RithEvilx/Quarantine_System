import "dotenv/config";

function required(name: string, fallback?: string) {
  const value = process.env[name] || fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 168),
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/quarantine_system"),
  accessSecret: required("JWT_ACCESS_SECRET", "local-access-secret-change-me"),
  refreshSecret: required("JWT_REFRESH_SECRET", "local-refresh-secret-change-me"),
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "change-before-production",
  telegramToken: process.env.TELEGRAM_BOT_TOKEN || "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  adminUrl: process.env.ADMIN_URL || "http://localhost:5174",
  defaultExchangeRate: Number(process.env.DEFAULT_USD_TO_KHR || 4100),
  abaWebhookSecret: process.env.ABA_WEBHOOK_SECRET || "local-aba-webhook-secret",
};