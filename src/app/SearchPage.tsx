import { useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import type { OrderValues, SearchResultsType, SortValues } from "../types";
import { searchRepositories } from "../utils/search";
import ErrorMessage from "../components/ErrorMessage";

const SearchPage = () => {
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
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
    setError(false);
    setLoading(true);
    try {
      const res = await searchRepositories(query, sort, order, page);

      setResults(res);
    } catch (error) {
      console.error(error);
      setError(true);
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
      {error ? (
        <ErrorMessage
          onRetry={() => performSearch({ searchTerm, searchIn, sort, order })}
        />
      ) : (
        <SearchResults
          results={results}
          loading={loading}
          sort={sort}
          order={order}
          onChangeSort={handleSortChange}
          onChangeOrder={handleOrderChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
