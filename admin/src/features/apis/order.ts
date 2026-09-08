import axiosInstance from "@/common/axiosInstance";

export type Order = { id: number; orderNumber: string; customerName: string; paymentMethod: string; grandTotal: number; status: string; createdAt?: string };
export async function listOrders() { const response = await axiosInstance.post("/order/list", { page: 1, rowsPerPage: 100, orderBy: "id DESC", searchText: "" }); return response.data.body as Order[]; }
export async function updateOrderStatus(payload: { id: number; status: string }) { const response = await axiosInstance.patch("/order/update-status", payload); return response.data.body as Order; }