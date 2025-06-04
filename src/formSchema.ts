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
});

export type SearchFormData = z.infer<typeof searchSchema>;
