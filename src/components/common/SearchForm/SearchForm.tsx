import { Search } from "@mui/icons-material";
import {
  type AutocompleteChangeReason,
  type AutocompleteHighlightChangeReason,
  type AutocompleteInputChangeReason,
  Autocomplete,
  InputAdornment,
  Popper,
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
  const [isInputFocused, setIsInputFocused] = useState(false);

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
          size: 7,
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
    e: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason !== "selectOption") return;
    executeSubmitLogic(value ?? "");
  };

  const handleInputChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: string,
    changeReason: AutocompleteInputChangeReason
  ) => {
    setInputValue(value);
    if (changeReason === "input") {
      setSavedInputValue(value);
    }
  };

  const handleHighlightChange = (
    e: React.SyntheticEvent<Element, Event>,
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
  //TOTO: target지정버그

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        disablePortal={true}
        size="small"
        renderInput={(params) => {
          return (
            <S.TextField
              {...params}
              isListOpen={Boolean(booksData?.documents) && isInputFocused}
              inputRef={input}
              onKeyDown={handleEnterOnInput}
              placeholder="원하는 책을 검색하세요"
              variant="outlined"
              sx={{ boxShadow: 3 }}
              autoFocus
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
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
        PaperComponent={(props) => <S.Paper {...props} sx={{ boxShadow: 3 }} />}
        PopperComponent={(props) => (
          <Popper {...props} disablePortal modifiers={[{ name: "flip", enabled: false }]} />
        )}
      />
    </form>
  );
};

export default SearchForm;
