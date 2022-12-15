import { Business, MenuBook, Person } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { useSearchParams } from "react-router-dom";

import { FILTER_VALUES, PARAMS_KEYS } from "@/constants";
import { FilterValue } from "@/types";

import * as S from "./styles";
// TODO 세로필터 만들기..

type SearchFilterProps = {
  orientation?: "horizontal" | "vertical";
  sx?: SxProps;
};
const SearchFilter = ({ orientation, sx }: SearchFilterProps) => {
  const [params, setParams] = useSearchParams();

  const filterValue = params.get(PARAMS_KEYS.filter) as FilterValue;

  const handleToggleChange = (e: React.SyntheticEvent<Element, Event>, value: FilterValue) => {
    if (!value) return;
    params.set(PARAMS_KEYS.filter, value);
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
        label={orientation === "horizontal" ? "저자" : <Business />}
        value={FILTER_VALUES.person}
      />
      <S.Tab
        label={orientation === "horizontal" ? "출판사" : <Person />}
        value={FILTER_VALUES.publisher}
      />
    </S.Tabs>
  );
};

export default SearchFilter;
