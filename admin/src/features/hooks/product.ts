import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, listProducts, updateProduct, type ListPayload, type ProductPayload } from "../apis/product";

export function useListProducts(payload: ListPayload, enabled = true) { return useQuery({ queryKey: ["admin-products", payload], queryFn: () => listProducts(payload), enabled }); }
export function useCreateProduct() { const client = useQueryClient(); return useMutation({ mutationFn: createProduct, onSuccess: () => client.invalidateQueries({ queryKey: ["admin-products"] }) }); }
export function useUpdateProduct() { const client = useQueryClient(); return useMutation({ mutationFn: updateProduct, onSuccess: () => client.invalidateQueries({ queryKey: ["admin-products"] }) }); }
export function useDeleteProduct() { const client = useQueryClient(); return useMutation({ mutationFn: deleteProduct, onSuccess: () => client.invalidateQueries({ queryKey: ["admin-products"] }) }); }
export type { ProductPayload };