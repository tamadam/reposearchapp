import { ACCESS_TOKEN, RESULTS_PER_PAGE, SEARCH_REPO_API_ENDPOINT } from "../constants";
import type { OrderValues, SortValues } from "../types";

export const searchRepositories = async (query: string, sort: SortValues, order: OrderValues, page = 1) => {
    const sortValue = sort && sort !== "default" ? sort : "";
    console.log(query)
    const url = `${SEARCH_REPO_API_ENDPOINT}?q=${encodeURIComponent(query)}&per_page=${RESULTS_PER_PAGE}&page=${page}${
        sortValue ? `&sort=${sortValue}` : ""
      }&order=${order}`;
    console.log(url)

    const response = await fetch(
      url,
      {
        headers: ACCESS_TOKEN
          ? {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              Accept: "application/vnd.github.text-match+json",
            }
          : {},
      }
    );
  
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  