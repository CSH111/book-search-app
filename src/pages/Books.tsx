import { Container } from "@mui/material";
import { truncate } from "fs";

import { SearchForm } from "@/components/common";
import { Header } from "@/components/common/Header";
import {
  HorizontalSearchBox,
  SearchFilter,
  VerticalSearchBox,
} from "@/components/common/SearchForm";

const Books = () => {
  return (
    <>
      <Header bg={true}>
        <HorizontalSearchBox>
          <SearchFilter orientation="vertical" />
          <SearchForm />
        </HorizontalSearchBox>
      </Header>
      <Container maxWidth="md" fixed>
        Books
      </Container>
    </>
  );
};

export default Books;
