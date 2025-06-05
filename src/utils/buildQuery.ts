import type { SearchFormData } from "../formSchema";

export const buildSearchQuery = (formData: SearchFormData): string => {
  const { searchBy, searchIn, advancedFilters } = formData;
  const queryParts: string[] = [];

  // Basic text search
  if (searchBy && searchIn.length !== 0) {
    queryParts.push(`${searchBy} in:${searchIn.join(",")}`);
  }

  // Advanced filters
  // User/org
  if (advancedFilters.userName) {
    queryParts.push(`user:${advancedFilters.userName}`);
  }

  if (advancedFilters.organization) {
    queryParts.push(`org:${advancedFilters.organization}`);
  }

  // Languages
  if (advancedFilters.language?.length) {
    queryParts.push(...advancedFilters.language.map((l) => `language:${l}`));
  }

  // Topics
  if (advancedFilters.topic?.length) {
    queryParts.push(...advancedFilters.topic.map((t) => `topic:${t}`));
  }

  // Stars
  if (advancedFilters.starsFilter) {
    const { mode, value, min, max } = advancedFilters.starsFilter;
    const starsQuery = buildRangeQuery("stars", mode, value, min, max);
    if (starsQuery) queryParts.push(starsQuery);
  }

  // Size
  if (advancedFilters.sizeFilter) {
    const { mode, value, min, max } = advancedFilters.sizeFilter;
    const sizeQuery = buildRangeQuery("size", mode, value, min, max);
    if (sizeQuery) queryParts.push(sizeQuery);
  }

  // Created date
  if (advancedFilters.createdDateFilter) {
    const { mode, value, min, max } = advancedFilters.createdDateFilter;
    const createdQuery = buildRangeQuery("created", mode, value, min, max);
    if (createdQuery) queryParts.push(createdQuery);
  }

  return queryParts.join(" ");
};

const buildRangeQuery = (
  key: string,
  mode?: string,
  value?: string | number,
  min?: string | number,
  max?: string | number
): string | null => {
  if (!mode) return null;

  switch (mode) {
    case "equal":
      return value != null ? `${key}:${value}` : null;

    case "gt":
      return value != null ? `${key}:>${value}` : null;

    case "lt":
      return value != null ? `${key}:<${value}` : null;

    case "onOrBefore":
    case "before":
      return value != null ? `${key}:<=${value}` : null;

    case "onOrAfter":
    case "after":
      return value != null ? `${key}:>=${value}` : null;

    case "between":
      return min != null && max != null ? `${key}:${min}..${max}` : null;

    default:
      return null;
  }
};
