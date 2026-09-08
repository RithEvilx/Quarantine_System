import { keepPreviousData, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { listProducts, type ProductFilter } from "../apis/products";

export function useListProducts(payload: ProductFilter, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, AxiosError>, "queryKey" | "queryFn">) {
  return useQuery({ queryKey: ["products", payload], queryFn: () => listProducts(payload), placeholderData: keepPreviousData, ...options });
}