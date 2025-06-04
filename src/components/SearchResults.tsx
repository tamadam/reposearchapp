import {
  CircularProgress,
  Box,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
} from "@mui/material";
import type { OrderValues, SearchResultsType, SortValues } from "../types";
import RepoCard from "./RepoCard";
import { RESULTS_PER_PAGE } from "../constants";

type SearchResultsProps = {
  results: SearchResultsType | null;
  loading: boolean;
  sort: SortValues;
  order: OrderValues;
  page: number;
  onChangeSort: (newSort: SortValues) => void;
  onChangeOrder: (newOrder: OrderValues) => void;
  onPageChange: (newPage: number) => void;
};

const SearchResults = ({
  results,
  loading,
  sort,
  order,
  page,
  onChangeSort,
  onChangeOrder,
  onPageChange,
}: SearchResultsProps) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!results || results?.items?.length === 0) {
    return (
      <Typography align="center" mt={4}>
        No results to display.
      </Typography>
    );
  }

  const sortButtons: { label: string; value: SortValues }[] = [
    { label: "Default", value: "default" },
    { label: "Stars", value: "stars" },
    { label: "Forks", value: "forks" },
  ];

  const orderButtons: { label: string; value: OrderValues }[] = [
    { label: "Desc", value: "desc" },
    { label: "Asc", value: "asc" },
  ];

  return (
    <Box mt={4}>
      <Stack direction="row" spacing={4} alignItems="center" mb={2}>
        <Typography>Sort by:</Typography>
        <ToggleButtonGroup
          value={sort}
          exclusive
          onChange={(_, value) => value && onChangeSort(value)}
          size="small"
        >
          {sortButtons.map((sortButton) => (
            <ToggleButton key={sortButton.value} value={sortButton.value}>
              {sortButton.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography>Order by:</Typography>
        <ToggleButtonGroup
          value={order}
          exclusive
          onChange={(_, value) => value && onChangeOrder(value)}
          size="small"
        >
          {orderButtons.map((orderButton) => (
            <ToggleButton key={orderButton.value} value={orderButton.value}>
              {orderButton.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box component="div" flexGrow={1} />
        <Typography>Total results: {results.total_count}</Typography>
      </Stack>
      {results.items.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(results.total_count / RESULTS_PER_PAGE)}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default SearchResults;
