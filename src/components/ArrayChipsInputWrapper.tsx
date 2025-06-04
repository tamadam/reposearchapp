import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ArrayChipsInput from "./ArrayChipsInput";

interface ArrayChipsInputWrapperProps<T> {
  field: {
    value: T[];
    onChange: (value: T[]) => void;
    name: string;
  };
  label?: string;
  maxDisplay?: number;
  maxWidth?: number | string;
  getLabel: (item: T) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  validateNewItem?: (item: string, currentItems: T[]) => boolean;
  transformNewItem?: (input: string) => T;
  error?: boolean;
  helperText?: React.ReactNode;
}
const ArrayChipsInputWrapper = <T,>({
  field,
  label = "Items",
  maxDisplay = 5,
  maxWidth = 300,
  getLabel,
  getKey,
  validateNewItem,
  transformNewItem,
  error = false,
  helperText,
}: ArrayChipsInputWrapperProps<T>) => {
  const [inputValue, setInputValue] = useState("");

  const items = (field.value ?? []) as T[];

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (validateNewItem && !validateNewItem(trimmed, items)) return;

    const newItem = transformNewItem
      ? transformNewItem(trimmed)
      : (trimmed as unknown as T);

    if (!items.includes(newItem)) {
      field.onChange([...items, newItem]);
    }
    setInputValue("");
  };

  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    field.onChange(newItems);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1">{label}</Typography>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <TextField
          size="small"
          label={`Add ${label}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
        />
        <Button
          onClick={addItem}
          variant="outlined"
          size="small"
          disabled={!inputValue.trim()}
        >
          Add
        </Button>
      </Stack>
      <ArrayChipsInput
        items={items}
        onDelete={deleteItem}
        getLabel={getLabel}
        getKey={getKey}
        maxDisplay={maxDisplay}
        maxWidth={maxWidth}
      />
      {error && typeof helperText === "string" && (
        <Typography
          color="error"
          variant="caption"
          sx={{ display: "block", mt: 0.5 }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ArrayChipsInputWrapper;
