import { useQuery } from "@tanstack/react-query";
import { listCategories } from "../apis/categories";

export function useListCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: listCategories });
}
