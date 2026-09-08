import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCartItem, createCart, deleteCartItem, findCart, getCartId, updateCartItem } from "../apis/cart";

export function useCart() { return useQuery({ queryKey: ["cart", getCartId()], queryFn: () => findCart(), retry: false }); }
export function useCreateCart() { return useMutation({ mutationFn: () => createCart() }); }
export function useAddCartItem() { const client = useQueryClient(); return useMutation({ mutationFn: addCartItem, onSuccess: () => client.invalidateQueries({ queryKey: ["cart"] }) }); }
export function useUpdateCartItem() { const client = useQueryClient(); return useMutation({ mutationFn: updateCartItem, onSuccess: () => client.invalidateQueries({ queryKey: ["cart"] }) }); }
export function useDeleteCartItem() { const client = useQueryClient(); return useMutation({ mutationFn: (productId: number) => deleteCartItem(productId), onSuccess: () => client.invalidateQueries({ queryKey: ["cart"] }) }); }