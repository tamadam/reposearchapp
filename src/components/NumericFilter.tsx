/* eslint-disable @typescript-eslint/no-explicit-any */
import Filter from "./Filter";
import type { Control } from "react-hook-form";
import type { UseFormSetValue } from "react-hook-form";

interface NumericFilterProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
  errors: any;
  trigger: any;
}

export const NumericFilter = (props: NumericFilterProps) => (
  <Filter {...props} type="number" />
);
