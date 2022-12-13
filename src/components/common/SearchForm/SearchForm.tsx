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

//TODO Click 서브밋, 로딩 이용 결과없음 표시
const SearchForm = () => {
  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<Dispatch>();
  // console.log(booksData?.documents);
  const titles = booksData?.documents.map((doc) => doc.title);
  const uniqueTitles = deduplicate(titles ?? []);
  const isNoResult = titles?.length === 0;
  const [optionValue, setOptionValue] = useState<string | null>(null);
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
    if (inputValue === "") return;
    const timer = setTimeout(async () => {
      dispatch(getBooks({ query: savedInputValue, target: targetParam }));
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

  const handleClickOption = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason !== "selectOption") return;
    console.log("submit 로직");
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
