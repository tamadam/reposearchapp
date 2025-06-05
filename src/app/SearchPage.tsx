import { useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import type { OrderValues, SearchResultsType, SortValues } from "../types";
import { searchRepositories } from "../utils/search";
import ErrorMessage from "../components/ErrorMessage";
import type { SearchFormData } from "../formSchema";
import { buildSearchQuery } from "../utils/buildQuery";
import { useSearchHistory } from "../stores/searchHistory";

const SearchPage = () => {
  const { addSearch } = useSearchHistory();

  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [sort, setSort] = useState<SortValues>("default");
  const [order, setOrder] = useState<OrderValues>("desc");

  const performSearch = async ({
    query,
    sort,
    order,
    page = 1,
    formData,
  }: {
    query: string;
    sort: SortValues;
    order: OrderValues;
    page?: number;
    formData?: SearchFormData;
  }) => {
    setError(false);
    setLoading(true);
    try {
      const res = await searchRepositories(query, sort, order, page);

      setResults(res);
      if (formData) {
        addSearch(query, formData, res);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data: SearchFormData) => {
    const query = buildSearchQuery(data);
    setSearchQuery(query);
    setCurrentPage(1);
    performSearch({
      query,
      sort,
      order,
      page: 1,
      formData: data,
    });
  };

  const handleFormReset = () => {
    setResults(null);
    setError(false);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortValues) => {
    setSort(newSort);
    setCurrentPage(1);
    performSearch({
      query: searchQuery,
      sort: newSort,
      order,
      page: 1,
    });
  };

  const handleOrderChange = (newOrder: OrderValues) => {
    setOrder(newOrder);
    setCurrentPage(1);
    performSearch({
      query: searchQuery,
      sort,
      order: newOrder,
      page: 1,
    });
  };

  return (
    <div>
      <SearchForm
        onFormSubmit={handleFormSubmit}
        onFormReset={handleFormReset}
      />
      {error ? (
        <ErrorMessage
          onRetry={() =>
            performSearch({
              query: searchQuery,
              sort,
              order,
            })
          }
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
            performSearch({
              query: searchQuery,
              sort,
              order,
              page: newPage,
            });
          }}
        />
      )}
    </div>
  );
};

export default SearchPage;
