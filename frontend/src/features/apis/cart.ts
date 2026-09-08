import axiosInstance from "@/common/axiosInstance";

export type CartItem = { productId: number; name: string; price: number; priceUsd: number; priceKhr: number; quantity: number; subtotal: number; image?: string | null };
export type Cart = { cartId: string; items: CartItem[]; totalQuantity: number; grandTotal: number };

export function getCartId() {
  const existing = localStorage.getItem("quarantine_cart_id");
  if (existing) return existing;
  const cartId = crypto.randomUUID();
  localStorage.setItem("quarantine_cart_id", cartId);
  return cartId;
}

export async function createCart(cartId = getCartId()) { const res = await axiosInstance.post("/cart/create", { cartId }); return res.data.body; }
export async function findCart(cartId = getCartId()): Promise<Cart> { const res = await axiosInstance.get("/cart/find", { params: { cartId } }); return res.data.body; }
export async function addCartItem(payload: { productId: number; quantity?: number; cartId?: string }) { const res = await axiosInstance.post("/cart/item/add", { ...payload, cartId: payload.cartId || getCartId() }); return res.data.body; }
export async function updateCartItem(payload: { productId: number; quantity: number; cartId?: string }) { const res = await axiosInstance.patch("/cart/item/update", { ...payload, cartId: payload.cartId || getCartId() }); return res.data.body; }
export async function deleteCartItem(productId: number, cartId = getCartId()) { const res = await axiosInstance.delete("/cart/item/delete", { params: { productId, cartId } }); return res.data.body; }
export async function clearCart(cartId = getCartId()) { const res = await axiosInstance.delete("/cart/clear", { params: { cartId } }); return res.data.body; }