import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { sendTelegramMessage, type TelegramPayload, type TelegramResponse } from "../apis/telegram";

/**
 * Send a Telegram message.
 */
const useSendTelegramMessage = (options?: UseMutationOptions<TelegramResponse, AxiosError, TelegramPayload>) => {
  return useMutation({
    mutationFn: (payload) => sendTelegramMessage(payload),
    ...options,
  });
};

export default useSendTelegramMessage;
