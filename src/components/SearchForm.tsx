import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchInOptions,
  searchSchema,
  type SearchFormData,
} from "../formSchema";
import { useState } from "react";

import ArrayChipsInputWrapper from "./ArrayChipsInputWrapper";

interface SearchFormProps {
  onFormSubmit: (searchTerm: string, searchIn: string[]) => void;
  onFormReset: () => void;
}

const SearchForm = ({ onFormSubmit, onFormReset }: SearchFormProps) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchBy: "",
      searchIn: [],
      advancedFilters: {
        userName: "",
        organization: "",
        topic: [],
        language: [],
      },
    },
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  const handleReset = () => {
    reset();
    onFormReset();
  };

  const onSubmit = async (data: SearchFormData) => {
    console.log(data);
    onFormSubmit(data.searchBy, data.searchIn);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
      <Stack
        direction="row"
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
        useFlexGap
        flexWrap="wrap"
      >
        <Stack direction="row" sx={{ flexGrow: 1 }}>
          <Controller
            name="searchBy"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Search by"
                fullWidth
                error={!!errors.searchBy}
                helperText={errors.searchBy?.message || " "}
              />
            )}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          sx={{ flexGrow: 1 }}
        >
          <Stack>
            <Controller
              name="searchIn"
              control={control}
              render={({ field }) => (
                <>
                  <FormGroup row sx={{ alignItems: "center", gap: "2rem" }}>
                    <Typography fontWeight="bold">In: </Typography>
                    <Box component="div">
                      {searchInOptions.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          control={
                            <Checkbox
                              checked={field.value.includes(option.value)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  field.onChange([
                                    ...field.value,
                                    option.value,
                                  ]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (val) => val !== option.value
                                    )
                                  );
                                }
                              }}
                            />
                          }
                          label={option.value}
                        />
                      ))}
                    </Box>
                  </FormGroup>
                </>
              )}
            />
            <Typography
              color="error"
              variant="caption"
              sx={{ minHeight: "1.25rem", mt: 0.5 }}
            >
              {errors.searchIn?.message || " "}
            </Typography>
          </Stack>
          <Box component="div" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{ mr: 2 }}
            >
              Search
            </Button>
            <Button
              onClick={handleReset}
              variant="contained"
              disabled={isSubmitting}
              color="secondary"
            >
              Reset
            </Button>
          </Box>
        </Stack>
        <Stack direction="row">
          <Button
            variant="contained"
            disabled={isSubmitting}
            color="warning"
            sx={{ mb: 2 }}
            onClick={toggleAdvanced}
          >
            {showAdvanced ? "Hide advanced" : "Show advanced"}
          </Button>
        </Stack>
      </Stack>
      {showAdvanced && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Stack spacing={2}>
            <Controller
              name="advancedFilters.userName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User Name"
                  size="small"
                  error={!!errors?.advancedFilters?.userName}
                  helperText={errors?.advancedFilters?.userName?.message || " "}
                  fullWidth
                />
              )}
            />
            <Controller
              name="advancedFilters.organization"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Organization"
                  size="small"
                  error={!!errors?.advancedFilters?.organization}
                  helperText={
                    errors?.advancedFilters?.organization?.message || " "
                  }
                  fullWidth
                />
              )}
            />
            <Controller
              name="advancedFilters.topic"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <ArrayChipsInputWrapper<string>
                  field={field}
                  label="Topic"
                  getLabel={(topic) => topic}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="advancedFilters.language"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <ArrayChipsInputWrapper<string>
                  field={field}
                  label="Language"
                  getLabel={(language) => language}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SearchForm;
