import { env } from "../config/env.js";

export async function sendOrderToTelegram(message: string) {
  if (!env.telegramToken || !env.telegramChatId) return null;
  const response = await fetch(`https://api.telegram.org/bot${env.telegramToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.telegramChatId, text: message }),
  });
  if (!response.ok) throw new Error("Telegram notification failed");
  const data = await response.json() as { result?: { message_id?: number } };
  return data.result?.message_id ?? null;
}