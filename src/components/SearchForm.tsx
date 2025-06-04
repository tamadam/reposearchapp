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

const SearchForm = () => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchBy: "",
      searchIn: [],
    },
  });

  const handleReset = () => {
    reset();
  };

  const onSubmit = (data: SearchFormData) => {
    console.log("Search term:", data.searchBy);
    console.log("Search in:", data.searchIn);
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
            <Button variant="contained" type="submit" sx={{ mr: 2 }}>
              Search
            </Button>
            <Button onClick={handleReset} variant="contained" color="secondary">
              Reset
            </Button>
          </Box>
        </Stack>
        <Stack direction="row">
          <Button variant="contained" color="warning" sx={{ mb: 2 }}>
            Dropdown
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchForm;
