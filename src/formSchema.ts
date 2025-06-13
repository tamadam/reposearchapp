import z from "zod";

// searchIn options
export const rawSearchInOptions = ["name", "description", "readme"] as const;

export const searchInOptions = rawSearchInOptions.map((field) => ({
  label: field.charAt(0).toUpperCase() + field.slice(1),
  value: field,
}));

export const searchSchema = z.object({
  searchBy: z.string().min(3, "Enter at least 3 characters"),
  searchIn: z
    .array(z.enum(rawSearchInOptions))
    .min(1, "Select at least one field to search in"),
  advancedFilters: z.object({
    userName: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 0 || val.length >= 3, {
        message: "User Name must be at least 3 characters",
      }),
    organization: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 0 || val.length >= 3, {
        message: "Organization must be at least 3 characters",
      }),
    topic: z
      .array(z.string().min(3, "Each topic must be at least 3 characters"))
      .refine((topics) => topics.every((topic) => topic.length >= 3), {
        message: "All topics must be at least 3 characters",
      }),
    language: z
      .array(z.string().min(3, "Each language must be at least 3 characters"))
      .refine((topics) => topics.every((topic) => topic.length >= 3), {
        message: "All languages must be at least 3 characters",
      }),
    starsFilter: z
      .object({
        mode: z.enum(["equal", "gt", "lt", "between"]).optional(),
        value: z.coerce.number().optional(),
        min: z.coerce.number().optional(),
        max: z.coerce.number().optional(),
      })
      .refine(
        (data) =>
          data.mode !== "between" ||
          data.min === undefined ||
          data.max === undefined ||
          data.min < data.max,
        {
          message: "Min must be less than Max",
        }
      )
      .optional(),
    sizeFilter: z
      .object({
        mode: z.enum(["equal", "gt", "lt", "between"]).optional(),
        value: z.coerce.number().optional(),
        min: z.coerce.number().optional(),
        max: z.coerce.number().optional(),
      })
      .refine(
        (data) =>
          data.mode !== "between" ||
          data.min === undefined ||
          data.max === undefined ||
          data.min < data.max,
        {
          message: "Min must be less than Max",
        }
      )
      .optional(),
    createdDateFilter: z
      .object({
        mode: z
          .enum(["before", "onOrBefore", "after", "onOrAfter", "between"])
          .optional(),
        value: z.string().datetime().optional(),
        min: z.string().datetime().optional(),
        max: z.string().datetime().optional(),
      })
      .refine(
        (data) =>
          data.mode !== "between" ||
          !data.min ||
          !data.max ||
          new Date(data.min) < new Date(data.max),
        {
          message: "Start date must be before end date",
        }
      )
      .optional(),
  }),
});

export type SearchFormData = z.infer<typeof searchSchema>;
