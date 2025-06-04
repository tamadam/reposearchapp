import { useState } from "react";
import { Box, Chip } from "@mui/material";

interface TopicChipsProps {
  topics: string[];
  onDelete: (index: number) => void;
  maxDisplay?: number;
  maxWidth?: number | string;
}

const TopicChips = ({
  topics,
  onDelete,
  maxDisplay = 5,
  maxWidth = 300,
}: TopicChipsProps) => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  const topicCount = topics.length;
  const displayTopics = showAllTopics ? topics : topics.slice(0, maxDisplay);
  const hiddenCount = showAllTopics ? 0 : topicCount - maxDisplay;

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
      {displayTopics.map((topic, index) => (
        <Chip
          key={index}
          label={topic}
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

      {!showAllTopics && hiddenCount > 0 && (
        <Box
          onClick={() => setShowAllTopics(true)}
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

export default TopicChips;
