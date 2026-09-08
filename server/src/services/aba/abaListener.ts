import { Api, TelegramClient } from "telegram";
import { EditedMessage, type EditedMessageEvent } from "telegram/events/EditedMessage.js";
import { NewMessage, type NewMessageEvent } from "telegram/events/NewMessage.js";
import { StringSession } from "telegram/sessions/index.js";
import type { CustomMessage } from "telegram/tl/custom/message.js";
import { env } from "../../config/env.js";
import { Order } from "../../models/Order.js";
import { matchPayment, type MatchCandidate, type ParsedPayment } from "./matcher.js";

const paymentPattern = /^\$(\d+(?:\.\d{1,2})?) paid by (.+?) \((\*\d+)\) on ([A-Za-z]{3} \d{2}, \d{2}:\d{2} [AP]M) via (.+?) at (.+?)\. Trx\. ID: ([^,]+), APV: (\S+)$/i;

// Stopgap for a personal static QR. Once ABA merchant KHQR is available,
// replace this listener with an Express callback_url route using merchant_ref.

export function parseAbaPayment(text: string, now = new Date()): ParsedPayment | null {
  const match = text.trim().match(paymentPattern);
  if (!match) return null;
  const paidAt = new Date(`${match[4]} ${now.getFullYear()}`);
  if (Number.isNaN(paidAt.getTime())) return null;
  return { amount: Number(match[1]), payerName: match[2].trim(), maskedAccount: match[3], paidAt, paymentMethod: match[5].trim(), trxId: match[7].trim(), apv: match[8].trim() };
}

function configuredChatId(value: string) {
  return value.trim();
}

function messageChatId(message: CustomMessage) {
  const raw = message.chatId?.toString();
  if (!raw) return "";
  if (raw.startsWith("-100") || raw.startsWith("-")) return raw;
  return `-100${raw}`;
}

async function isAbaPaymentBotMessage(message: CustomMessage) {
  const sender = await message.getSender();
  const expectedUsername = env.abaPaymentBotUsername.replace(/^@/, "").toLowerCase();
  const isBot = sender instanceof Api.User && Boolean(sender.bot);
  const username = sender instanceof Api.User ? sender.username?.toLowerCase() : undefined;
  if (isBot && username !== expectedUsername) {
    console.warn(`Ignoring ABA payment bot ${username || "without username"}; expected ${expectedUsername}.`);
  }
  return isBot && username === expectedUsername;
}

export async function sendBotMessage(chatId: string, text: string) {
  if (!env.botToken) throw new Error("BOT_TOKEN or TELEGRAM_BOT_TOKEN is required for order notifications.");
  const response = await fetch(`https://api.telegram.org/bot${env.botToken}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text }) });
  if (!response.ok) throw new Error(`Telegram Bot API returned ${response.status}`);
}

function orderMessage(order: {
  orderNumber?: string;
  customerName?: string | null;
  paymentMethod?: string | null;
  paymentStatus?: string | null;
  items?: Array<{ name?: string | null; quantity?: number | null; priceUsd?: number | null; priceKhr?: number | null }>;
  grandTotal?: number;
}, payment: ParsedPayment) {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-US", { hour12: true });
  const items = (order.items || [])
    .map((item) => `• ${item.quantity || 0} x ${item.name || "Item"} - $${((item.priceUsd || 0) * (item.quantity || 0)).toFixed(2)} / KHR ${((item.priceKhr || 0) * (item.quantity || 0)).toLocaleString()}`)
    .join("\n");
  const totalKhr = (order.items || []).reduce((total, item) => total + (item.priceKhr || 0) * (item.quantity || 0), 0);

  return `*********************************\n🛒 NEW ORDER\n*********************************\n\n🆔 ${order.orderNumber || "Unknown order"}\n📅 Date: ${date}\n🕐 Time: ${time}\n\n👤 CUSTOMER: ${order.customerName || ""}\n💳 PAYMENT: KHQR\n🟢 ${order.paymentStatus || "PAID"}\n\n📦 ITEMS\n${items || "• No items"}\n\n**************************\n💰 TOTAL: $${Number(order.grandTotal || 0).toFixed(2)} / ៛${totalKhr.toLocaleString()}\n**************************\n\n🔖 TRX ID: ${payment.trxId}\n🔐 APV: ${payment.apv}`;
}

export async function verifyPaymentText(text: string) {
  const payment = parseAbaPayment(text);
  if (!payment) return;

  const alreadyUsed = await Order.exists({ trxId: payment.trxId });
  if (alreadyUsed) return;

  const cutoff = new Date(Date.now() - env.abaMatchWindowMinutes * 60 * 1000);
  const orders = await Order.find({ createdAt: { $gte: cutoff }, $or: [{ status: "pending" }, { status: "PENDING_PAYMENT" }, { paymentStatus: "PENDING" }] }).lean();
  const candidates: MatchCandidate[] = orders.map((order) => ({ id: String(order._id), orderNumber: order.orderNumber || undefined, customerName: order.customerName || "", amount: Number(order.amount ?? order.grandTotal ?? 0), createdAt: order.createdAt, status: order.status === "PENDING_PAYMENT" || order.paymentStatus === "PENDING" ? "pending" : order.status }));
  const result = matchPayment(payment, candidates, { windowMinutes: env.abaMatchWindowMinutes, similarityThreshold: env.abaNameSimilarityThreshold });

  if (result.kind === "no-match") return;
  if (result.kind === "flagged") {
    await Order.updateMany({ _id: { $in: result.candidates.map((candidate) => candidate.id) } }, { $set: { status: "flagged" } });
    await sendBotMessage(env.abaAdminChatId, `⚠️ PAYMENT REVIEW NEEDED\n\n💰 $${payment.amount.toFixed(2)}\n👤 ${payment.payerName}\n🔖 ${payment.trxId}\n\nMultiple pending orders matched this payment.`);
    return;
  }

  const updated = await Order.findOneAndUpdate({ _id: result.order.id, trxId: { $exists: false }, $or: [{ status: "pending" }, { status: "PENDING_PAYMENT" }, { paymentStatus: "PENDING" }] }, { $set: { status: "paid", paymentStatus: "PAID", paymentMethod: "KHQR", trxId: payment.trxId, abaApv: payment.apv, abaPaidAt: payment.paidAt, paidAt: new Date() } }, { new: true }).lean();
  if (!updated) return;
  await sendBotMessage(env.abaOrderChatId, orderMessage({
    orderNumber: updated.orderNumber || undefined,
    customerName: updated.customerName || "",
    paymentMethod: updated.paymentMethod || "khqr",
    paymentStatus: updated.paymentStatus || "PAID",
    items: updated.items,
    grandTotal: Number(updated.grandTotal || 0),
  }, payment));
}

export async function startAbaListener() {
  if (!env.abaApiId || !env.abaApiHash || !env.abaSession) { console.warn("ABA listener disabled: set ABA_API_ID, ABA_API_HASH, and ABA_SESSION."); return async () => {}; }
  const client = new TelegramClient(new StringSession(env.abaSession), env.abaApiId, env.abaApiHash, { connectionRetries: 5 });
  await client.connect();
  if (!(await client.checkAuthorization())) throw new Error("ABA GramJS session is not authorized. Run login-once.");
  const handler = async (event: NewMessageEvent | EditedMessageEvent) => {
    try {
      const message = event.message as unknown as CustomMessage;
      if (messageChatId(message) !== configuredChatId(env.abaNotificationChatId)) return;
      if (!(await isAbaPaymentBotMessage(message))) return;
      await client.sendMessage(env.abaNotificationChatId, { message: (message.message || "").trim() });
      console.log("Copied ABA payment message into the notification chat for bot verification.");
    } catch (error) {
      console.error("ABA payment message copy failed:", error);
    }
  };
  client.addEventHandler(handler, new NewMessage({}));
  client.addEventHandler(handler, new EditedMessage({}));
  console.log(`ABA listener connected for ${env.abaNotificationChatId}`);
  return async () => { client.removeEventHandler(handler, new NewMessage({})); client.removeEventHandler(handler, new EditedMessage({})); await client.disconnect(); };
}
