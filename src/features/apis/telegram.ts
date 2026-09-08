import axios from "axios";

export interface TelegramPayload {
  chatId: string;
  message: string;
}

export interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
  };
}

//* Send Telegram Message
export async function sendTelegramMessage(payload: TelegramPayload): Promise<TelegramResponse> {
  try {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

    const { chatId, message } = payload;

    const res = await axios.post<TelegramResponse>(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });

    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
