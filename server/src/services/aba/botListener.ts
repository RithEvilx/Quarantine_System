import { env } from "../../config/env.js";
import { verifyPaymentText } from "./abaListener.js";

type TelegramUpdate = {
  update_id: number;
  message?: {
    chat?: { id?: number };
    from?: { id?: number; is_bot?: boolean };
    text?: string;
  };
};

function apiUrl(method: string, query: URLSearchParams) {
  return `https://api.telegram.org/bot${env.botToken}/${method}?${query.toString()}`;
}

async function getUpdates(offset: number, timeout: number) {
  const query = new URLSearchParams({ offset: String(offset), timeout: String(timeout), allowed_updates: JSON.stringify(["message"]) });
  const response = await fetch(apiUrl("getUpdates", query));
  if (!response.ok) throw new Error(`Telegram getUpdates returned ${response.status}`);
  const body = await response.json() as { ok: boolean; result?: TelegramUpdate[] };
  if (!body.ok) throw new Error("Telegram getUpdates returned an unsuccessful response.");
  return body.result || [];
}

async function latestOffset() {
  const updates = await getUpdates(0, 0);
  return updates.length ? Math.max(...updates.map((update) => update.update_id)) + 1 : 0;
}

export async function startBotPaymentListener() {
  if (!env.botToken) {
    console.warn("Bot payment listener disabled: set BOT_TOKEN or TELEGRAM_BOT_TOKEN.");
    return async () => {};
  }

  let running = true;
  let offset = await latestOffset();

  const poll = async () => {
    while (running) {
      try {
        const updates = await getUpdates(offset, 20);
        for (const update of updates) {
          offset = Math.max(offset, update.update_id + 1);
          const message = update.message;
          if (!message || String(message.chat?.id) !== env.abaNotificationChatId) continue;
          if (String(message.from?.id) !== env.abaCopySenderId || message.from?.is_bot || !message.text) continue;
          await verifyPaymentText(message.text);
        }
      } catch (error) {
        console.error("Bot payment listener failed:", error);
      }
    }
  };

  void poll();
  console.log(`Bot payment listener connected for ${env.abaNotificationChatId}.`);
  return async () => { running = false; };
}