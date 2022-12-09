import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const SearchForm = () => {
  const [input, setInput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [originalInput, setOriginalInput] = useState("");
  // const handleInputChange: = (_, value) => {
  //   setInput(value);
  // };

  // const handleHighlightChange = (event, option, reason) => {
  //   if (option && reason === "keyboard") {
  //     setInput(option);
  //   }
  // };
  // const handleFilterOptions = (currentOptions) => currentOptions;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit">d</button>
      <Autocomplete
        freeSolo
        value={input}
        onInputChange={(e, v, r) => {
          if (r === "input") {
            setOriginalInput(v);
          }
          setInput(v);
        }}
        onChange={(_, value, r) => {
          setInput(value ?? "");
        }}
        clearOnBlur={false}
        options={labelList}
        includeInputInList={true}
        onHighlightChange={(event, option, reason) => {
          if (!option && event && reason === "keyboard") {
            setInput(originalInput);
          }
          if (option && reason === "keyboard") {
            setInput(option);
          }
        }}
        filterOptions={(val) => val}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Combo box"
            variant="outlined"
            // onSubmit={(e) => e.preventDefault()}
            // onKeyDown={(e) => console.log(e.code)}
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
