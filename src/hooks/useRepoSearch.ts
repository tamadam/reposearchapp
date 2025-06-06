import { useQuery } from "@tanstack/react-query";
import { searchRepositories } from "../utils/search";
import type { SortValues, OrderValues } from "../types";

export const useRepoSearch = (
  query: string,
  sort: SortValues,
  order: OrderValues,
  page: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["repoSearch", query, sort, order, page],
    queryFn: () => searchRepositories(query, sort, order, page),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
