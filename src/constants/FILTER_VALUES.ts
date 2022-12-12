import { FilterValue } from "@/types";

// type FilterValues = { [key in FilterValue]: FilterValue };
type FilterValues = Record<FilterValue, FilterValue>;

export const FILTER_VALUES: FilterValues = {
  title: "title",
  person: "person",
  publisher: "publisher",
} as const;
