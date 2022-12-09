import {
  type AutocompleteHighlightChangeReason,
  type AutocompleteInputChangeReason,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [typedInputValue, setTypedInputValue] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">검색</button>
      <Autocomplete
        freeSolo
        value={inputValue}
        onInputChange={handleInputChange}
        clearOnBlur={false}
        options={labelList}
        includeInputInList={true}
        onHighlightChange={handleHighlightChange}
        filterOptions={(val) => val}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Combo box"
            placeholder="원하는 책을 검색하세요"
            variant="outlined"
            onKeyDown={handleEnterOnInput}
          />
        )}
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
