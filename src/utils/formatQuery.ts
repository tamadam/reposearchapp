export interface FormattedQuery {
  rawQuery: string;
  searchTerm?: string;
  searchIn?: string[];
  filters: Array<{ key: string; value: string }>;
}

export const formatQuery = (queryString: string): FormattedQuery => {
  if (!queryString) return { rawQuery: "", filters: [] };

  const parts = queryString.split(" ");
  const result: FormattedQuery = {
    rawQuery: queryString,
    filters: [],
  };

  parts.forEach((part) => {
    if (part.includes(":")) {
      const [key, value] = part.split(":");
      result.filters.push({ key, value });
    } else if (part === "in:") {
      // Skip the "in" part as it's handled with the values
    } else if (part) {
      if (!result.searchTerm) {
        result.searchTerm = part;
      } else {
        result.searchTerm += ` ${part}`;
      }
    }
  });

  // Group searchIn filters
  const searchInFilters = result.filters.filter((f) => f.key === "in");
  if (searchInFilters.length > 0) {
    result.searchIn = searchInFilters.flatMap((f) => f.value.split(","));
    result.filters = result.filters.filter((f) => f.key !== "in");
  }

  return result;
};
