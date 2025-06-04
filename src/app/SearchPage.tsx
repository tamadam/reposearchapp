import { useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import type { OrderValues, SearchResultsType, SortValues } from "../types";
import { searchRepositories } from "../utils/search";
import ErrorMessage from "../components/ErrorMessage";

const SearchPage = () => {
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
    setCurrentPage(1);
    performSearch({ searchTerm: term, searchIn: fields, sort, order, page: 1 });
  };

  const handleFormReset = () => {
    setResults(null);
    setError(false);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortValues) => {
    setSort(newSort);
    setCurrentPage(1);
    performSearch({ searchTerm, searchIn, sort: newSort, order, page: 1 });
  };

  const handleOrderChange = (newOrder: OrderValues) => {
    setOrder(newOrder);
    setCurrentPage(1);
    performSearch({ searchTerm, searchIn, sort, order: newOrder, page: 1 });
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
          page={currentPage}
          onChangeSort={handleSortChange}
          onChangeOrder={handleOrderChange}
          onPageChange={(newPage) => {
            setCurrentPage(newPage);
            performSearch({ searchTerm, searchIn, sort, order, page: newPage });
          }}
        />
      )}
    </div>
  );
};

export default SearchPage;
