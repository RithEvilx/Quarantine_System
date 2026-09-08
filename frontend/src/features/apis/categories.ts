import axiosInstance from "@/common/axiosInstance";

export type Category = { id: number; name: string; slug: string; isActive: boolean };

export async function listCategories() {
  const response = await axiosInstance.post("/category/list", { page: 1, rowsPerPage: 100, orderBy: "id DESC", searchText: "" });
  return response.data.body as Category[];
}
