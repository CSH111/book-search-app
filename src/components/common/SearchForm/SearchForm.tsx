import { Search } from "@mui/icons-material";
import {
  type AutocompleteHighlightChangeReason,
  type AutocompleteInputChangeReason,
  Autocomplete,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useRef, useState } from "react";

import { FILTER_VALUES } from "@/constants";
import { useService } from "@/service";
import { FilterValue } from "@/types";

const SearchForm = () => {
  const xx = useService();
  console.log(xx?.bookService);
  const [inputValue, setInputValue] = useState("");
  const [typedInputValue, setTypedInputValue] = useState("");
  const [toggleValue, setToggleValue] = useState<FilterValue>(FILTER_VALUES.title);
  const input = useRef<HTMLInputElement>(null);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("제출", inputValue);
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    changeReason: AutocompleteInputChangeReason
  ) => {
    if (changeReason === "input") {
      setTypedInputValue(value);
    }
    setInputValue(value);
  };

  const handleHighlightChange = (
    event: React.SyntheticEvent<Element, Event>,
    option: string | null,
    reason: AutocompleteHighlightChangeReason
  ) => {
    if (reason !== "keyboard") return;
    if (!option && event) {
      setInputValue(typedInputValue);
    }
    if (option) {
      setInputValue(option);
    }
  };

  const handleEnterOnInput: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "Enter") return;
    e.stopPropagation();
  };

  const handleToggleChange = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: FilterValue) => {
    setToggleValue(value);
    input.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToggleButtonGroup
        onChange={handleToggleChange}
        value={toggleValue}
        color="primary"
        exclusive
        size="small"
      >
        <ToggleButton value={FILTER_VALUES.title}>책 제목</ToggleButton>
        <ToggleButton value={FILTER_VALUES.person}>저자</ToggleButton>
        <ToggleButton value={FILTER_VALUES.publisher}>출판사</ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        freeSolo
        value={inputValue}
        onInputChange={handleInputChange}
        options={labelList}
        includeInputInList={true}
        onHighlightChange={handleHighlightChange}
        filterOptions={(val) => val}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              autoFocus
              inputRef={input}
              placeholder="원하는 책을 검색하세요"
              variant="outlined"
              onKeyDown={handleEnterOnInput}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          );
        }}
      />
    </form>
  );
};

export default SearchForm;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "미미", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
const labelList = top100Films.map((item) => item.title);
