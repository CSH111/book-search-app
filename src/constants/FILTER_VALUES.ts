import { FilterValue } from "@/types";

// type FilterValues = { [key in FilterValue]: FilterValue };
type FilterValues = Record<FilterValue, FilterValue>;

const FILTER_VALUES: FilterValues = {
  title: "title",
  person: "person",
  publisher: "publisher",
} as const;

export default FILTER_VALUES;
