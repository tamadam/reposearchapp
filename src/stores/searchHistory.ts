import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchFormData } from "../formSchema";
import type { SearchResultsType } from "../types";

type SearchHistoryItem = {
  id: string;
  timestamp: number;
  query: string;
  searchData: SearchFormData;
  results: SearchResultsType;
};

type SearchHistoryState = {
  searches: SearchHistoryItem[];
  addSearch: (
    query: string,
    searchData: SearchFormData,
    results: SearchResultsType
  ) => void;
  removeSearch: (id: string) => void;
  clearHistory: () => void;
};

export const useSearchHistory = create<SearchHistoryState>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (query, searchData, results) =>
        set((state) => ({
          searches: [
            {
              id: Date.now().toString(),
              timestamp: Date.now(),
              query,
              searchData,
              results,
            },
            ...state.searches,
          ],
        })),
      removeSearch: (id) =>
        set((state) => ({
          searches: state.searches.filter((s) => s.id !== id),
        })),
      clearHistory: () => set({ searches: [] }),
    }),
    {
      name: "repo-search-history",
    }
  )
);
