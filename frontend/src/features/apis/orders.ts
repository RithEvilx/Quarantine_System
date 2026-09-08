import axiosInstance from "@/common/axiosInstance";

export type CreateOrderPayload = {
  cartId: string;
  customerName: string;
  paymentMethod: "cod" | "khqr";
  customerPhone?: string;
  deliveryAddress?: string;
};

export async function createOrder(payload: CreateOrderPayload) {
  const res = await axiosInstance.post("/order/create", payload);
  const { header, body, poweredBy } = res.data;

  if (header.statusCode >= 200 && header.statusCode < 300 && header.result !== false) {
    return { header, body, poweredBy };
  }

  return Promise.reject(res.data);
}

export async function getOrderPaymentStatus(orderNumber: string) {
  const res = await axiosInstance.get("/order/payment-status", { params: { orderNumber } });
  const { header, body, poweredBy } = res.data;

  if (header.statusCode >= 200 && header.statusCode < 300 && header.result !== false) {
    return { header, body, poweredBy };
  }

  return Promise.reject(res.data);
}