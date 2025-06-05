import { Box, Chip, Typography } from "@mui/material";
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
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);

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
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mt: 1,
        maxWidth,
        alignItems: "center",
      }}
    >
      {displayItems.map((item, index) => (
        <Chip
          key={getKey ? getKey(item, index) : index}
          label={
            <Typography variant="body2" component="span">
              {getLabel(item)}
            </Typography>
          }
          onDelete={() => onDelete(index)}
          onMouseEnter={() => setHoveredChip(index)}
          onMouseLeave={() => setHoveredChip(null)}
          sx={{
            backgroundColor: (theme) =>
              hoveredChip === index
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            color: "common.white",
            borderRadius: 1,
            transition: "all 0.2s ease",
            transform: hoveredChip === index ? "scale(1.05)" : "scale(1)",
            boxShadow: (theme) =>
              hoveredChip === index ? theme.shadows[2] : "none",
            "& .MuiChip-deleteIcon": {
              color: "common.white",
              opacity: hoveredChip === index ? 1 : 0,
              transition: "opacity 0.2s ease",
              "&:hover": {
                color: "common.white",
              },
            },
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        />
      ))}

      {!showAll && hiddenCount > 0 && (
        <Chip
          label={`+${hiddenCount}`}
          onClick={() => setShowAll(true)}
          sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
            color: (theme) => theme.palette.text.secondary,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.grey[300],
            },
          }}
        />
      )}
    </Box>
  );
};

export default ArrayChipsInput;
