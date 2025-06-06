import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import type { OrderValues, SortValues } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import type { SearchFormData } from "../formSchema";
import { buildSearchQuery } from "../utils/buildQuery";
import { useSearchHistory } from "../stores/searchHistory";
import { useRepoSearch } from "../hooks/useRepoSearch";

const SearchPage = () => {
  const { addSearch } = useSearchHistory();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [formData, setFormData] = useState<SearchFormData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState<SortValues>("default");
  const [order, setOrder] = useState<OrderValues>("desc");

  const { data, isLoading, isError, refetch } = useRepoSearch(
    searchQuery,
    sort,
    order,
    currentPage,
    !!searchQuery
  );

  useEffect(() => {
    if (data && formData) {
      addSearch(searchQuery, formData, data);
    }
  }, [data, formData, addSearch, searchQuery]);

  const handleFormSubmit = (data: SearchFormData) => {
    const query = buildSearchQuery(data);
    setSearchQuery(query);
    setCurrentPage(1);
    setFormData(data);
  };

  const handleFormReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setFormData(null);
  };

  const handleSortChange = (newSort: SortValues) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const handleOrderChange = (newOrder: OrderValues) => {
    setOrder(newOrder);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchForm
        onFormSubmit={handleFormSubmit}
        onFormReset={handleFormReset}
      />
      {isError ? (
        <ErrorMessage onRetry={refetch} />
      ) : (
        <SearchResults
          results={data}
          loading={isLoading}
          sort={sort}
          order={order}
          page={currentPage}
          onChangeSort={handleSortChange}
          onChangeOrder={handleOrderChange}
          onPageChange={(newPage) => {
            setCurrentPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default SearchPage;
