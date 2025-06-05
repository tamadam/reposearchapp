import { IconButton, Typography, Divider, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSearchHistory } from "../stores/searchHistory";
import { useState } from "react";
import SearchResults from "../components/SearchResults";
import { ResizableBox } from "react-resizable";

const HistoryPage = () => {
  const { searches, removeSearch, clearHistory } = useSearchHistory();
  const [selectedId, setSelectedId] = useState<string | null>(
    searches[0]?.id || null
  );

  const selectedSearch = searches.find((s) => s.id === selectedId) || null;

  const resizeHandleStyle: React.CSSProperties = {
    position: "absolute",
    right: 0,
    top: 0,
    width: "10px",
    height: "100%",
    cursor: "ew-resize",
    backgroundColor: "transparent",
    zIndex: 10,
  };

  return (
    <Box display="flex" height="100%  " overflow="hidden">
      <ResizableBox
        width={300}
        height={Infinity}
        axis="x"
        resizeHandles={["e"]}
        minConstraints={[200, Infinity]}
        maxConstraints={[600, Infinity]}
        handle={<span style={resizeHandleStyle} />}
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            padding: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Search History
          </Typography>

          {searches.length === 0 ? (
            <Typography>No search history yet</Typography>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={clearHistory}
                size="small"
                sx={{ mb: 2 }}
              >
                Clear All
              </Button>

              {searches.map((search) => (
                <Box
                  key={search.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                    borderRadius: 1,
                    bgcolor:
                      search.id === selectedId
                        ? "action.selected"
                        : "transparent",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                    mb: 0.5,
                  }}
                  onClick={() => setSelectedId(search.id)}
                >
                  <Box>
                    <Typography variant="body1">{search.query}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(search.timestamp).toLocaleString()}
                    </Typography>
                  </Box>

                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSearch(search.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </>
          )}
        </Box>
      </ResizableBox>

      <Box flex={1} padding={3} overflow="auto">
        {selectedSearch ? (
          <>
            <Typography variant="h6" gutterBottom>
              Results for: <code>{selectedSearch.query}</code>
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <SearchResults
              results={selectedSearch.results}
              loading={false}
              sort="default"
              order="desc"
              page={1}
              fullVersion={false}
              onChangeSort={() => {}}
              onChangeOrder={() => {}}
              onPageChange={() => {}}
            />
          </>
        ) : (
          <Typography>Select a search from the list</Typography>
        )}
      </Box>
    </Box>
  );
};

export default HistoryPage;
