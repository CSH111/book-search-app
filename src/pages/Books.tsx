import { Box, Divider, List } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { BookItem, Container, Pagination } from "@/components/Books";
import { SearchForm } from "@/components/common";
import { Header } from "@/components/common/Header";
import { HorizontalSearchBox, SearchFilter } from "@/components/common/SearchForm";
import { type Dispatch, type RootState } from "@/store";
import { getBooksForResult, searchResultActions } from "@/store/searchResultSlice";
import { FilterValue } from "@/types";
// ------FIX 검색어 바꾸자마자 바로 제출하면 버그 발생(결과안뜸)
const Books = () => {
  const [params] = useSearchParams();
  const { target, query, page, size, total } = Object.fromEntries(params.entries());
  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.searchResult);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch(
      getBooksForResult({
        query,
        target: target as FilterValue,
        size: Number(size),
        page: Number(page),
      })
    );
  }, [query, page]);

  return (
    <>
      <Header bg={true}>
        <HorizontalSearchBox>
          <SearchFilter orientation="vertical" />
          <SearchForm focusOnLoad={false} />
        </HorizontalSearchBox>
      </Header>
      <Container>
        <Box sx={{ flex: 1, alignSelf: "stretch", mb: "30px" }}>
          {total === "0" && <div>검색 결과가 없습니다.</div>}
          {total !== "0" && (
            <List>
              {booksData?.documents.map(
                (
                  { title, authors, thumbnail, publisher, isbn, datetime, price, sale_price },
                  idx
                ) => {
                  return (
                    <React.Fragment key={isbn}>
                      {idx !== 0 && <Divider sx={{ margin: "15px" }} />}
                      <BookItem
                        authors={authors}
                        title={title}
                        thumbnail={thumbnail}
                        publisher={publisher}
                        datetime={datetime}
                        price={price}
                        sale_price={sale_price}
                      />
                    </React.Fragment>
                  );
                }
              )}
            </List>
          )}
        </Box>
        <Pagination />
      </Container>
    </>
  );
};

export default Books;
