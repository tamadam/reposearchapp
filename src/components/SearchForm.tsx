import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Fade,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
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
import { NumericFilter } from "./NumericFilter";
import { DateFilter } from "./DateFilter";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SearchFormProps {
  onFormSubmit: (data: SearchFormData) => void;
  onFormReset: () => void;
}

const SearchForm = ({ onFormSubmit, onFormReset }: SearchFormProps) => {
  const theme = useTheme();

  const {
    reset,
    handleSubmit,
    setValue,
    trigger,
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
        starsFilter: {
          mode: "gt",
          value: undefined,
          min: undefined,
          max: undefined,
        },
        sizeFilter: {
          mode: "gt",
          value: undefined,
          min: undefined,
          max: undefined,
        },
        createdDateFilter: {
          mode: "onOrBefore",
          value: undefined,
          min: undefined,
          max: undefined,
        },
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
    onFormSubmit(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: theme.shadows[2],
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        useFlexGap
        flexWrap="wrap"
      >
        <Stack direction="row" sx={{ flexGrow: 1, width: "100%" }}>
          <Controller
            name="searchBy"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Search repositories"
                fullWidth
                variant="outlined"
                error={!!errors.searchBy}
                helperText={errors.searchBy?.message || " "}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            )}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={3}
          sx={{ flexGrow: 1, width: "100%" }}
        >
          <Box>
            <Controller
              name="searchIn"
              control={control}
              render={({ field }) => (
                <>
                  <FormGroup
                    row
                    sx={{ alignItems: "center", gap: "1rem", flexWrap: "wrap" }}
                  >
                    <Typography fontWeight="bold" color="text.secondary">
                      Search in:
                    </Typography>
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
                              sx={{
                                color: theme.palette.primary.main,
                                "&.Mui-checked": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={option.value}
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                  </FormGroup>
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ minHeight: "1.25rem", mt: 0.5 }}
                  >
                    {errors.searchIn?.message || " "}
                  </Typography>
                </>
              )}
            />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignSelf: { xs: "stretch", sm: "flex-end" } }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                flexGrow: { xs: 1, sm: 0 },
                background: "linear-gradient(135deg, #0288d1 0%, #01579b 100%)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[4],
                },
                transition: "all 0.3s ease",
              }}
            >
              Search
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              disabled={isSubmitting}
              color="secondary"
              sx={{
                flexGrow: { xs: 1, sm: 0 },
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[2],
                },
                transition: "all 0.3s ease",
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="text"
          disabled={isSubmitting}
          color="primary"
          endIcon={showAdvanced ? <ExpandLess /> : <ExpandMore />}
          onClick={toggleAdvanced}
          sx={{
            mb: 1,
            "&:hover": {
              backgroundColor: "transparent",
              color: theme.palette.primary.dark,
            },
          }}
        >
          {showAdvanced ? "Hide advanced options" : "Show advanced options"}
        </Button>
      </Box>

      <Collapse in={showAdvanced} timeout="auto" unmountOnExit>
        <Fade in={showAdvanced} timeout={500}>
          <Box
            sx={{
              mt: 2,
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              backgroundColor: "background.default",
              boxShadow: theme.shadows[1],
            }}
          >
            <Grid container spacing={3}>
              <Grid size={6}>
                <Controller
                  name="advancedFilters.userName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="User Name"
                      size="small"
                      error={!!errors?.advancedFilters?.userName}
                      helperText={
                        errors?.advancedFilters?.userName?.message || " "
                      }
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
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
              </Grid>

              <Grid size={12}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Controller
                        name="advancedFilters.topic"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <ArrayChipsInputWrapper<string>
                            field={field}
                            label="Topics"
                            getLabel={(topic) => topic}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={6}>
                      <Controller
                        name="advancedFilters.language"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <ArrayChipsInputWrapper<string>
                            field={field}
                            label="Languages"
                            getLabel={(language) => language}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid size={12}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <NumericFilter
                        control={control}
                        setValue={setValue}
                        name="advancedFilters.starsFilter"
                        label="Stars"
                        errors={errors}
                        trigger={trigger}
                      />
                    </Grid>
                    <Grid size={6}>
                      <NumericFilter
                        control={control}
                        setValue={setValue}
                        name="advancedFilters.sizeFilter"
                        label="Size"
                        errors={errors}
                        trigger={trigger}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid size={12}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <DateFilter
                    control={control}
                    setValue={setValue}
                    name="advancedFilters.createdDateFilter"
                    label="Created Date"
                    errors={errors}
                    trigger={trigger}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Collapse>
    </Box>
  );
};

export default SearchForm;
