import { Box, Chip } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";

interface ArrayChipsInputProps<T> {
  items: T[];
  onDelete: (index: number) => void;
  maxDisplay?: number;
  maxWidth?: number | string;
  getLabel: (item: T) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
}
const ArrayChipsInput = <T,>({
  items,
  onDelete,
  maxDisplay = 5,
  maxWidth = 300,
  getLabel,
  getKey,
}: ArrayChipsInputProps<T>) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll && items.length <= maxDisplay) {
      setShowAll(false);
    }
  }, [items.length, maxDisplay, showAll]);

  const count = items.length;
  const displayItems = showAll ? items : items.slice(0, maxDisplay);
  const hiddenCount = showAll ? 0 : count - maxDisplay;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        rowGap: 1,
        columnGap: 1,
        mt: 1,
        maxWidth,
      }}
    >
      {displayItems.map((item, index) => (
        <Chip
          key={getKey ? getKey(item, index) : index}
          label={getLabel(item)}
          onDelete={() => onDelete(index)}
          sx={{
            "& .MuiChip-deleteIcon": {
              opacity: 0,
              transition: "opacity 0.3s",
            },
            "&:hover .MuiChip-deleteIcon": {
              opacity: 1,
            },
          }}
        />
      ))}

      {!showAll && hiddenCount > 0 && (
        <Box
          onClick={() => setShowAll(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "primary.main",
            fontSize: "0.875rem",
            cursor: "pointer",
            userSelect: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          ...{hiddenCount} more
        </Box>
      )}
    </Box>
  );
};

export default ArrayChipsInput;
