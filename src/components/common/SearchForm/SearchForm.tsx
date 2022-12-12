import { Search } from "@mui/icons-material";
import {
  type AutocompleteChangeReason,
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
import { useNavigate, useSearchParams } from "react-router-dom";

import { FILTER_VALUES } from "@/constants";
import { type Dispatch, type RootState } from "@/store";
import { getBooks } from "@/store/booksSlice";
import { booksActions } from "@/store/booksSlice";
import { FilterValue } from "@/types";
import { deduplicate } from "@/utils";
// const val:XX =

const SearchForm = () => {
  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<Dispatch>();

  const titles = booksData?.documents.map((doc) => doc.title);
  const uniqueTitles = deduplicate(titles ?? []);

  // const navigate = useNavigate();
  const [hilightedOption, setHilightedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [savedInputValue, setSavedInputValue] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const [params, setParams] = useSearchParams();
  const targetParam = (params.get("target") as FilterValue) ?? FILTER_VALUES.title;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("제출", inputValue, targetParam);
  };
  useEffect(() => {
    setParams({ target: targetParam });
  }, []);

  // TODO: 분리
  useEffect(() => {
    if (savedInputValue === "") {
      dispatch(booksActions.clear());
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(getBooks({ query: savedInputValue, target: targetParam }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [savedInputValue, targetParam]);

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    changeReason: AutocompleteInputChangeReason
  ) => {
    if (changeReason === "input") {
      setSavedInputValue(value);
      setInputValue(value);
    }
  };

  const handleHighlightChange = (
    event: React.SyntheticEvent<Element, Event>,
    option: string | null,
    reason: AutocompleteHighlightChangeReason
  ) => {
    if (reason !== "keyboard") return;
    if (!option) {
      setInputValue(savedInputValue);
      setHilightedOption(null);
      return;
    }
    setInputValue(option);
    setHilightedOption(option);
  };

  const handleEnterOnInput: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "Enter") return;
    e.stopPropagation();
  };

  const handleToggleChange = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: FilterValue) => {
    input.current?.focus();
    if (!value) return;
    setParams({ target: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToggleButtonGroup
        onChange={handleToggleChange}
        value={params.get("target")}
        color="primary"
        exclusive
        size="small"
      >
        <ToggleButton value={FILTER_VALUES.title}>책 제목</ToggleButton>
        <ToggleButton value={FILTER_VALUES.person}>저자</ToggleButton>
        <ToggleButton value={FILTER_VALUES.publisher}>출판사</ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        // autoHighlight={true} //default false
        freeSolo
        // onChange={handleValueChange}
        value={hilightedOption}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={uniqueTitles}
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
