import axiosInstance from "@/common/axiosInstance";

export type ProductFilter = { page: number; rowsPerPage: number | string; orderBy: string; searchText: string; categoryId?: number | null; categoryType?: string | null };
export type Product = { id: number; name: string; price: number; priceUsd?: number; priceKhr?: number; image?: string | null; stock: number; categoryId?: number | null };

export async function listProducts(payload: ProductFilter) {
  const res = await axiosInstance.post("/product/list", payload);
  if (res.data.header.statusCode < 200 || res.data.header.statusCode >= 300) return Promise.reject(res.data);
  return { body: res.data.body as Product[], pagination: res.data.header.pagination ?? null };
}