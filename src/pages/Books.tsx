import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Container, Pagination } from "@/components/Books";
import { SearchForm } from "@/components/common";
import { Header } from "@/components/common/Header";
import { HorizontalSearchBox, SearchFilter } from "@/components/common/SearchForm";

const Books = () => {
  //   const [params] = useSearchParams();
  // useEffect(() => {

  // }, [])

  return (
    <>
      <Header bg={true}>
        <HorizontalSearchBox>
          <SearchFilter orientation="vertical" />
          <SearchForm />
        </HorizontalSearchBox>
      </Header>
      <Container>
        <Box>dd</Box>
        <Pagination />
      </Container>
    </>
  );
};

export default Books;
