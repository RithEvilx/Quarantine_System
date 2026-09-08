import axiosInstance from "@/common/axiosInstance";

export type Product = { id: number; name: string; slug: string; price: number; priceUsd?: number; priceKhr?: number; stock: number; categoryId?: number; isActive: boolean; image?: string | null };
export type ProductPayload = Omit<Partial<Product>, "id"> & { name: string; price: number; stock: number };
export type ListPayload = { page: number; rowsPerPage: number; orderBy: string; searchText: string };

export async function listProducts(payload: ListPayload) { const response = await axiosInstance.post("/product/list", { ...payload, includeInactive: true }); return { body: response.data.body as Product[], pagination: response.data.header.pagination }; }
export async function createProduct(payload: ProductPayload) { const response = await axiosInstance.post("/product/create", payload); return response.data.body as Product; }
export async function updateProduct(payload: Product & { id: number }) { const response = await axiosInstance.patch("/product/update", payload); return response.data.body as Product; }
export async function deleteProduct(id: number) { const response = await axiosInstance.delete("/product/delete", { params: { id } }); return response.data.body as Product; }