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

interface NumericFilterProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
}

const getFieldPath = (base: string, field: string) => `${base}.${field}`;

export const NumericFilter: React.FC<NumericFilterProps> = ({
  control,
  setValue,
  name,
  label,
}) => {
  const mode = useWatch({ control, name: getFieldPath(name, "mode") });

  const handleModeChange = (newMode: "equal" | "gt" | "lt" | "between") => {
    setValue(getFieldPath(name, "mode"), newMode);
    if (newMode === "between") {
      setValue(getFieldPath(name, "value"), undefined);
    } else {
      setValue(getFieldPath(name, "min"), undefined);
      setValue(getFieldPath(name, "max"), undefined);
    }
  };

  return (
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
              const newMode = e.target.value as
                | "equal"
                | "gt"
                | "lt"
                | "between";
              field.onChange(newMode);
              handleModeChange(newMode);
            }}
          >
            {[
              { label: "Equal", value: "equal" },
              { label: "Greater than", value: "gt" },
              { label: "Less than", value: "lt" },
              { label: "Between", value: "between" },
            ].map(({ label, value }) => (
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

      {(mode === "equal" || mode === "gt" || mode === "lt") && (
        <Controller
          name={getFieldPath(name, "value")}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={label.replace(" Filter", "")}
              value={field.value ?? ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                field.onChange(
                  inputValue === "" ? undefined : Number(inputValue)
                );
              }}
            />
          )}
        />
      )}

      {mode === "between" && (
        <Stack direction="row" spacing={2}>
          <Controller
            name={getFieldPath(name, "min")}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Min"
                value={field.value ?? ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  field.onChange(
                    inputValue === "" ? undefined : Number(inputValue)
                  );
                }}
              />
            )}
          />
          <Controller
            name={getFieldPath(name, "max")}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Max"
                value={field.value ?? ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  field.onChange(
                    inputValue === "" ? undefined : Number(inputValue)
                  );
                }}
              />
            )}
          />
        </Stack>
      )}
    </Box>
  );
};
