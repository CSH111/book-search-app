import { Search } from "@mui/icons-material";
import {
  type AutocompleteChangeReason,
  type AutocompleteHighlightChangeReason,
  type AutocompleteInputChangeReason,
  Autocomplete,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { FILTER_VALUES, PARAMS_KEYS } from "@/constants";
import { type Dispatch, type RootState } from "@/store";
import { getBooks } from "@/store/booksSlice";
import { booksActions } from "@/store/booksSlice";
import { FilterValue } from "@/types";
import { deduplicate } from "@/utils";

import * as S from "./styles";

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
  const filterValue = params.get(PARAMS_KEYS.filter) as FilterValue;

  const paramsForBooksPage = {
    [PARAMS_KEYS.target]: filterValue,
    [PARAMS_KEYS.filter]: filterValue,
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
    if (filterValue) return;
    setParams({ [PARAMS_KEYS.filter]: FILTER_VALUES.title });
  }, []);

  // TODO: 분리
  useEffect(() => {
    if (savedInputValue === "") return;
    const timer = setTimeout(async () => {
      dispatch(
        getBooks({
          [PARAMS_KEYS.query]: savedInputValue,
          [PARAMS_KEYS.target]: filterValue,
          size: 8,
        })
      );
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [savedInputValue, filterValue]);

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
    }
    setOptionValue(option);
  };

  const handleEnterOnInput: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "Enter") return;
    e.stopPropagation();
  };
  const handleToggleChange = (e: React.SyntheticEvent<Element, Event>, value: FilterValue) => {
    input.current?.focus();
    if (!value) return;
    params.set(PARAMS_KEYS.filter, value);
    setParams(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      <S.Tabs value={filterValue} onChange={handleToggleChange}>
        <S.Tab label={"제목"} value={FILTER_VALUES.title} />
        <S.Tab label={"저자"} value={FILTER_VALUES.person} />
        <S.Tab label={"출판사"} value={FILTER_VALUES.publisher} />
      </S.Tabs>
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
