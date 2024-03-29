import { Search } from "@mui/icons-material";
import {
  type AutocompleteChangeReason,
  type AutocompleteHighlightChangeReason,
  type AutocompleteInputChangeReason,
  Autocomplete,
  InputAdornment,
  Popper,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { useDebounce } from "@/hooks";
import { type Dispatch, type RootState } from "@/store";
import { booksActions, getBooks } from "@/store/booksSlice";
import { FilterValue, ParamsKey } from "@/types";
import { extractAuthorsFromBooks, extractTitlesFromBooks } from "@/utils";

import * as S from "./styles";
//TODO param set로직 페이지 컴포넌트로 이동, State 객체화

type SearchFormProps = {
  focusOnLoad?: boolean;
};

type Params = {
  [key in ParamsKey]?: string;
};

const SearchForm = ({ focusOnLoad = true }: SearchFormProps) => {
  const navigate = useNavigate();
  //TODO 에러ui처리
  const createSearchParamsWithKeys = (params: Params) => createSearchParams(params);
  const { booksData } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<Dispatch>();

  const [options, setOptions] = useState<string[] | null>(null);

  const [params, setParams] = useSearchParams();
  const setFilterParamsWithKey = (params: { [key in ParamsKey]?: FilterValue }) =>
    setParams(params);
  const { filter: filterValue, query } = useMemo(
    () => Object.fromEntries(params.entries()),
    [params]
  );

  const [optionValue, setOptionValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [savedInputValue, setSavedInputValue] = useState(query ?? "");
  const debouncedSavedInputValue = useDebounce(savedInputValue);

  const input = useRef<HTMLInputElement>(null);

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const isNoResult = options !== null && options.length === 0;

  const defaultParamsForNavigation: Params = {
    target: filterValue,
    filter: filterValue,
    page: "1",
    size: "10",
  };

  const navigateToBooks = (searchValue: string) => {
    navigate({
      pathname: "/books",
      search: `?${createSearchParamsWithKeys({
        ...defaultParamsForNavigation,
        query: searchValue,
      })}`,
    });
  };

  const executeSubmitLogic = (searchValue: string) => {
    dispatch(booksActions.clear());
    navigateToBooks(searchValue);
  };

  useEffect(() => {
    if (!booksData) {
      setOptions(null);
      return;
    }
    switch (filterValue as FilterValue) {
      case "title": {
        const titles = extractTitlesFromBooks(booksData.documents, inputValue);
        setOptions(titles);
        break;
      }
      case "person": {
        const authors = extractAuthorsFromBooks(booksData.documents, inputValue);
        setOptions(authors);
        break;
      }
    }
  }, [booksData, filterValue]);

  useEffect(() => {
    if (filterValue) return;
    setFilterParamsWithKey({ filter: "title" });
  }, []);

  useEffect(() => {
    if (!query) return;
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (debouncedSavedInputValue === "") return;
    dispatch(
      getBooks({
        query: savedInputValue,
        target: filterValue as FilterValue,
        size: 8,
      })
    );
  }, [debouncedSavedInputValue]);

  useEffect(() => {
    if (inputValue === "") {
      dispatch(booksActions.clear());
      return;
    }
  }, [inputValue, filterValue]);

  const handleSubmitWithEnter: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    executeSubmitLogic(inputValue);
  };

  const handleClickResultItem = (
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

  const handlePopupOpen = () => {
    setIsPopupOpened(true);
  };
  const handlePopupClose = () => {
    setIsPopupOpened(false);
  };
  return (
    <form onSubmit={handleSubmitWithEnter}>
      <Autocomplete
        onOpen={handlePopupOpen}
        onClose={handlePopupClose}
        loading={isNoResult}
        loadingText={"추천 검색어가 없습니다."}
        options={options ?? []}
        value={optionValue}
        onChange={handleClickResultItem}
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
              isPopupOpened={isPopupOpened && options !== null}
              inputRef={input}
              onKeyDown={handleEnterOnInput}
              placeholder="원하는 책을 검색하세요"
              variant="outlined"
              sx={{ boxShadow: 3 }}
              autoFocus={Boolean(focusOnLoad)}
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
