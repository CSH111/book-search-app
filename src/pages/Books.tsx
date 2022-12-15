import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Container, Pagination } from "@/components/Books";
import { SearchForm } from "@/components/common";
import { Header } from "@/components/common/Header";
import { HorizontalSearchBox, SearchFilter } from "@/components/common/SearchForm";
import { type Dispatch, type RootState } from "@/store";
import { booksActions, getBooks } from "@/store/booksSlice";
import { FilterValue } from "@/types";
const Books = () => {
  const [params] = useSearchParams();
  const { target, filter, title, query, total, page, size } = Object.fromEntries(params.entries());
  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<Dispatch>();
  console.log(booksData);

  useEffect(() => {
    console.log(`effect`);
    dispatch(
      getBooks({ query, target: target as FilterValue, size: Number(size), page: Number(page) })
    );
  }, []);

  return (
    <>
      <Header bg={true}>
        <HorizontalSearchBox>
          <SearchFilter orientation="vertical" />
          <SearchForm focusOnLoad={false} />
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
