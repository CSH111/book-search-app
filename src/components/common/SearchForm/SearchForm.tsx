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
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { FILTER_VALUES, PARAMS_KEYS } from "@/constants";
import { type Dispatch, type RootState } from "@/store";
import { getBooks } from "@/store/booksSlice";
import { booksActions } from "@/store/booksSlice";
import { FilterValue } from "@/types";
import { deduplicate } from "@/utils";

const SearchForm = () => {
  const navigate = useNavigate();

  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<Dispatch>();

  const titles = booksData?.documents.map((doc) => doc.title);
  const uniqueTitles = deduplicate(titles ?? []);
  const isNoResult = titles?.length === 0;

  const [optionValue, setOptionValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [savedInputValue, setSavedInputValue] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const [params, setParams] = useSearchParams();
  const targetParam = (params.get(PARAMS_KEYS.target) as FilterValue) ?? FILTER_VALUES.title;

  const paramsForBooksPage = {
    [PARAMS_KEYS.target]: targetParam,
    [PARAMS_KEYS.query]: inputValue,
    [PARAMS_KEYS.page]: "1",
    [PARAMS_KEYS.size]: "10",
  };
  const navigateToBooks = (query?: string) => {
    navigate({
      pathname: "/books",
      search: query
        ? `?${createSearchParams({ ...paramsForBooksPage, [PARAMS_KEYS.query]: query })}`
        : `?${createSearchParams({ ...paramsForBooksPage })}`,
    });
  };
  const executeSubmitLogic = (query?: string) => {
    dispatch(booksActions.clear());
    navigateToBooks(query);
  };

  useEffect(() => {
    setParams({ [PARAMS_KEYS.target]: targetParam });
  }, []);

  // TODO: 분리
  useEffect(() => {
    if (savedInputValue === "") return;
    const timer = setTimeout(async () => {
      dispatch(
        getBooks({
          [PARAMS_KEYS.query]: savedInputValue,
          [PARAMS_KEYS.target]: targetParam,
          size: 8,
        })
      );
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [savedInputValue, targetParam]);

  useEffect(() => {
    if (inputValue === "") {
      dispatch(booksActions.clear());
      return;
    }
  }, [inputValue]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    executeSubmitLogic();
  };

  const handleClickOption = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason !== "selectOption") return;
    executeSubmitLogic(value ?? "");
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    changeReason: AutocompleteInputChangeReason
  ) => {
    setInputValue(value);
    if (changeReason === "input") {
      setSavedInputValue(value);
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
      // return;
    }
    setOptionValue(option);
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
        value={targetParam}
        color="primary"
        exclusive
        size="small"
      >
        <ToggleButton value={FILTER_VALUES.title}>책 제목</ToggleButton>
        <ToggleButton value={FILTER_VALUES.person}>저자</ToggleButton>
        <ToggleButton value={FILTER_VALUES.publisher}>출판사</ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        loading={isNoResult}
        loadingText={"추천 검색어가 없습니다."}
        options={uniqueTitles}
        value={optionValue}
        onChange={handleClickOption}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onHighlightChange={handleHighlightChange}
        freeSolo
        includeInputInList={true}
        filterOptions={(val) => val}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              autoFocus
              name="keyword"
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
