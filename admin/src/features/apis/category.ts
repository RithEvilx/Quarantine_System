import axiosInstance from "@/common/axiosInstance";

export type Category = { id: number; name: string; slug: string; type?: string; isActive: boolean };
export async function listCategories() { const response = await axiosInstance.post("/category/list", { page: 1, rowsPerPage: 100, orderBy: "id DESC", searchText: "" }); return response.data.body as Category[]; }
export async function createCategory(payload: { name: string }) { const response = await axiosInstance.post("/category/create", payload); return response.data.body as Category; }
export async function deleteCategory(id: number) { const response = await axiosInstance.delete("/category/delete", { params: { id } }); return response.data.body as Category; }