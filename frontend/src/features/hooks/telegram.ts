import { useMutation, useQuery, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { createOrder, getOrderPaymentStatus, type CreateOrderPayload } from "../apis/orders";

const useCreateOrder = (options?: UseMutationOptions<unknown, AxiosError, CreateOrderPayload>) => {
  return useMutation({
    mutationFn: (payload) => createOrder(payload),
    ...options,
  });
};

export default useCreateOrder;

export function useOrderPaymentStatus(orderNumber: string | null) {
  return useQuery({
    queryKey: ["order-payment-status", orderNumber],
    queryFn: () => getOrderPaymentStatus(orderNumber || ""),
    enabled: Boolean(orderNumber),
    refetchInterval: (query) => (query.state.data?.body?.paymentStatus === "PAID" ? false : 3000),
  });
}
