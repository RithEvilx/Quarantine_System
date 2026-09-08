import dotenv from "dotenv";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { StringSession } from "telegram/sessions/index.js";
import { TelegramClient } from "telegram";

dotenv.config({ path: ".env" });

const apiId = Number(process.env.ABA_API_ID || process.env.TELEGRAM_API_ID || 0);
const apiHash = process.env.ABA_API_HASH || process.env.TELEGRAM_API_HASH || "";

if (!apiId || !apiHash) throw new Error("Set ABA_API_ID and ABA_API_HASH before running login-once.");

const prompt = createInterface({ input, output });
const client = new TelegramClient(new StringSession(""), apiId, apiHash, { connectionRetries: 5 });

try {
  await client.start({
    phoneNumber: async () => prompt.question("Telegram phone number: "),
    phoneCode: async () => prompt.question("Telegram login code: "),
    password: async () => prompt.question("Telegram 2FA password (leave blank if disabled): "),
    onError: async (error) => { console.error(error); return false; },
  });
  console.log("\nABA_SESSION=" + client.session.save());
  console.log("Save this value as ABA_SESSION in the server environment.");
} finally {
  prompt.close();
  await client.disconnect();
}
