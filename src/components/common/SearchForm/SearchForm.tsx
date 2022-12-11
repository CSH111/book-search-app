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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FILTER_VALUES } from "@/constants";
import { type Dispatch, type RootState } from "@/store";
import { getBooks } from "@/store/booksSlice";
import { FilterValue } from "@/types";

const SearchForm = () => {
  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.books);
  const titles = booksData?.documents.map((doc) => doc.title);

  const dispatch = useDispatch<Dispatch>();
  const [inputValue, setInputValue] = useState("");
  const [typedInputValue, setTypedInputValue] = useState("");
  const [filterToggleValue, setFilterToggleValue] = useState<FilterValue>(FILTER_VALUES.title);
  const input = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("제출", inputValue);
  };

  useEffect(() => {
    if (typedInputValue === "") return;

    const timer = setTimeout(async () => {
      dispatch(getBooks({ keyWord: typedInputValue, filterOption: filterToggleValue }));
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [typedInputValue]);

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
    setFilterToggleValue(value);
    input.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToggleButtonGroup
        onChange={handleToggleChange}
        value={filterToggleValue}
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
        options={titles ?? []}
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
