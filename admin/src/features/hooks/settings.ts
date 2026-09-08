import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExchangeRate, updateExchangeRate } from "../apis/settings";
export function useExchangeRate(enabled = true) { return useQuery({ queryKey: ["exchange-rate"], queryFn: getExchangeRate, enabled }); }
export function useUpdateExchangeRate() { const client = useQueryClient(); return useMutation({ mutationFn: updateExchangeRate, onSuccess: () => client.invalidateQueries({ queryKey: ["exchange-rate"] }) }); }