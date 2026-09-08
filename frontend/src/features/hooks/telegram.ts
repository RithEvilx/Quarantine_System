import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { createOrder, type CreateOrderPayload } from "../apis/orders";

const useCreateOrder = (options?: UseMutationOptions<unknown, AxiosError, CreateOrderPayload>) => {
  return useMutation({
    mutationFn: (payload) => createOrder(payload),
    ...options,
  });
};

export default useCreateOrder;
