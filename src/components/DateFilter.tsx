/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control } from "react-hook-form";
import type { UseFormSetValue } from "react-hook-form";
import Filter from "./Filter";

interface DateFilterProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
}

export const DateFilter = (props: DateFilterProps) => (
  <Filter {...props} type="date" />
);
