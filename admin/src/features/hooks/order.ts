import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listOrders, updateOrderStatus } from "../apis/order";
export function useListOrders(enabled = true) { return useQuery({ queryKey: ["admin-orders"], queryFn: listOrders, enabled }); }
export function useUpdateOrderStatus() { const client = useQueryClient(); return useMutation({ mutationFn: updateOrderStatus, onSuccess: () => client.invalidateQueries({ queryKey: ["admin-orders"] }) }); }