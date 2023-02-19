import { MenuBook, Person } from "@mui/icons-material";
import { TabProps } from "@mui/material/Tab";
import { SxProps } from "@mui/system";
import { useSearchParams } from "react-router-dom";

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
  const filterValue = getParams("filter") ?? "title";
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
      <Tab label={orientation === "horizontal" ? "제목" : <MenuBook />} value="title" />
      <Tab label={orientation === "horizontal" ? "저자" : <Person />} value="person" />
    </S.Tabs>
  );
};

export default SearchFilter;

interface MyTabProps extends TabProps {
  value: FilterValue;
}

const Tab = ({ ...props }: MyTabProps) => {
  return <S.Tab {...props} />;
};
