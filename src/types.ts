/* eslint-disable @typescript-eslint/no-explicit-any */
export type SearchResultsType = {
    incomplete_results: boolean;
    items: any[];
    total_count: number;
}

export type SortValues = "default" | "stars" | "forks";

export type OrderValues = "desc" | "asc";