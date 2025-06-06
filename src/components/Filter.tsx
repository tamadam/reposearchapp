/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
} from "@mui/material";
import {
  Controller,
  type Control,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";

type NumericFilterMode = "equal" | "gt" | "lt" | "between";
type DateFilterMode =
  | "before"
  | "onOrBefore"
  | "after"
  | "onOrAfter"
  | "between";
type FilterType = "number" | "date";

interface FilterOption {
  label: string;
  value: NumericFilterMode | DateFilterMode;
}

interface FilterProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
  type: FilterType;
  errors: any;
  trigger: any;
}

const getFieldPath = (base: string, field: string) => `${base}.${field}`;

const numericOptions: FilterOption[] = [
  { label: "Equal", value: "equal" },
  { label: "Greater than", value: "gt" },
  { label: "Less than", value: "lt" },
  { label: "Between", value: "between" },
];

const dateOptions: FilterOption[] = [
  { label: "Before", value: "before" },
  { label: "On or before", value: "onOrBefore" },
  { label: "After", value: "after" },
  { label: "On or after", value: "onOrAfter" },
  { label: "Between", value: "between" },
];

const Filter = ({
  control,
  setValue,
  name,
  label,
  type,
  errors,
  trigger,
}: FilterProps) => {
  const mode = useWatch({ control, name: getFieldPath(name, "mode") });

  const options = type === "date" ? dateOptions : numericOptions;

  const handleModeChange = (newMode: NumericFilterMode | DateFilterMode) => {
    setValue(getFieldPath(name, "mode"), newMode);
    if (newMode === "between") {
      setValue(getFieldPath(name, "value"), undefined);
    } else {
      setValue(getFieldPath(name, "min"), undefined);
      setValue(getFieldPath(name, "max"), undefined);
    }

    trigger(name);
  };

  const renderInputField = (
    field: any,
    fieldLabel: string,
    name: string,
    displayErrorMessage = true
  ) => {
    const [category, fieldName] = name.split(".");

    if (type === "number") {
      return (
        <TextField
          {...field}
          type="number"
          label={fieldLabel}
          value={field.value ?? ""}
          onChange={(e) => {
            const inputValue = e.target.value;
            field.onChange(inputValue === "" ? undefined : Number(inputValue));
          }}
          onBlur={() => trigger(name)}
          error={!!errors?.[category || ""]?.[fieldName || ""]}
          helperText={
            displayErrorMessage &&
            errors?.[category || ""]?.[fieldName || ""]?.message
          }
        />
      );
    }

    return (
      <DatePicker
        label={fieldLabel}
        value={field.value ? dayjs(field.value) : null}
        onChange={(newValue: Dayjs | null) => {
          field.onChange(newValue ? newValue.toISOString() : undefined);
        }}
        onClose={() => trigger(name)}
        enableAccessibleFieldDOMStructure={false}
        slotProps={{
          textField: {
            inputProps: {
              readOnly: true,
            },
            onKeyDown: (e) => e.preventDefault(),
            error: !!errors?.[category || ""]?.[fieldName || ""],
            helperText:
              displayErrorMessage &&
              errors?.[category || ""]?.[fieldName || ""]?.message,
          },
        }}
      />
    );
  };

  const shouldRenderSingleField = () => {
    if (type === "number") {
      return mode === "equal" || mode === "gt" || mode === "lt";
    }
    return (
      mode === "before" ||
      mode === "onOrBefore" ||
      mode === "after" ||
      mode === "onOrAfter"
    );
  };

  const content = (
    <Box>
      <Typography fontWeight="medium" mb={1}>
        {label}
      </Typography>

      <Controller
        name={getFieldPath(name, "mode")}
        control={control}
        render={({ field }) => (
          <RadioGroup
            row
            value={field.value ?? ""}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleModeChange(
                e.target.value as NumericFilterMode | DateFilterMode
              );
            }}
          >
            {options.map(({ label, value }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
        )}
      />

      {shouldRenderSingleField() && (
        <Controller
          name={getFieldPath(name, "value")}
          control={control}
          render={({ field }) => renderInputField(field, label, name)}
        />
      )}

      {mode === "between" && (
        <Stack direction="row" spacing={2}>
          <Controller
            name={getFieldPath(name, "min")}
            control={control}
            render={({ field }) => renderInputField(field, "From", name)}
          />
          <Controller
            name={getFieldPath(name, "max")}
            control={control}
            render={({ field }) => renderInputField(field, "To", name, false)}
          />
        </Stack>
      )}
    </Box>
  );

  return type === "date" ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {content}
    </LocalizationProvider>
  ) : (
    content
  );
};

export default Filter;
