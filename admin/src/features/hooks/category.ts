import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, listCategories } from "../apis/category";
export function useListCategories(enabled = true) { return useQuery({ queryKey: ["admin-categories"], queryFn: listCategories, enabled }); }
export function useCreateCategory() { const client = useQueryClient(); return useMutation({ mutationFn: createCategory, onSuccess: () => client.invalidateQueries({ queryKey: ["admin-categories"] }) }); }
export function useDeleteCategory() { const client = useQueryClient(); return useMutation({ mutationFn: deleteCategory, onSuccess: () => client.invalidateQueries({ queryKey: ["admin-categories"] }) }); }