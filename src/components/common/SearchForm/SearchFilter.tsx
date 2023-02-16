import { MenuBook, Person } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { useSearchParams } from "react-router-dom";

import { FILTER_VALUES } from "@/constants";
import { FilterValue, ParamsKey } from "@/types";

import * as S from "./styles";

type SearchFilterProps = {
  orientation?: "horizontal" | "vertical";
  sx?: SxProps;
};
const SearchFilter = ({ orientation, sx }: SearchFilterProps) => {
  const [params, setParams] = useSearchParams();
  const getParams = (param: ParamsKey) => params.get(param);
  const preSetParams = (param: ParamsKey, value: FilterValue) => params.set(param, value);
  const filterValue = getParams("filter") ?? FILTER_VALUES.title;
  const handleToggleChange = (e: React.SyntheticEvent<Element, Event>, value: FilterValue) => {
    if (!value) return;
    preSetParams("filter", value);
    setParams(params);
  };
  return (
    <S.Tabs
      value={filterValue}
      onChange={handleToggleChange}
      sx={sx}
      orientation={orientation ?? "horizontal"}
    >
      <S.Tab
        label={orientation === "horizontal" ? "제목" : <MenuBook />}
        value={FILTER_VALUES.title}
      />
      <S.Tab
        label={orientation === "horizontal" ? "저자" : <Person />}
        value={FILTER_VALUES.person}
      />
    </S.Tabs>
  );
};

export default SearchFilter;
