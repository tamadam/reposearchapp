import { useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import type { OrderValues, SearchResultsType, SortValues } from "../types";
import { searchRepositories } from "../utils/search";

const SearchPage = () => {
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIn, setSearchIn] = useState<string[]>([]);

  const [sort, setSort] = useState<SortValues>("default");
  const [order, setOrder] = useState<OrderValues>("desc");

  const performSearch = async ({
    searchTerm,
    searchIn,
    sort,
    order,
    page = 1,
  }: {
    searchTerm: string;
    searchIn: string[];
    sort: SortValues;
    order: OrderValues;
    page?: number;
  }) => {
    const query = `${searchTerm} in:${searchIn.join(",")}`;

    setLoading(true);
    try {
      const res = await searchRepositories(query, sort, order, page);
      setResults(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (term: string, fields: string[]) => {
    setSearchTerm(term);
    setSearchIn(fields);
    performSearch({ searchTerm: term, searchIn: fields, sort, order });
  };

  const handleFormReset = () => {
    setResults(null);
  };

  const handleSortChange = (newSort: SortValues) => {
    setSort(newSort);
    performSearch({ searchTerm, searchIn, sort: newSort, order });
  };

  const handleOrderChange = (newOrder: OrderValues) => {
    setOrder(newOrder);
    performSearch({ searchTerm, searchIn, sort, order: newOrder });
  };

  return (
    <div>
      <SearchForm
        onFormSubmit={handleFormSubmit}
        onFormReset={handleFormReset}
      />
      <SearchResults
        results={results}
        loading={loading}
        sort={sort}
        order={order}
        onChangeSort={handleSortChange}
        onChangeOrder={handleOrderChange}
      />
    </div>
  );
};

export default SearchPage;
