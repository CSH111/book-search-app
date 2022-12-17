import { Box, Divider, List } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { BookItem, Container, NoResult, Pagination } from "@/components/Books";
import { SearchForm } from "@/components/common";
import { Header } from "@/components/common/Header";
import { HorizontalSearchBox, SearchFilter } from "@/components/common/SearchForm";
import { type Dispatch, type RootState } from "@/store";
import { getBooksForResult, searchResultActions } from "@/store/searchResultSlice";
import { FilterValue } from "@/types";

const Books = () => {
  const [params, setParams] = useSearchParams();
  const { target, query, page, size, total } = Object.fromEntries(params.entries());
  //TODO: 에러ui처리
  const { booksData, isError, isLoading } = useSelector((state: RootState) => state.searchResult);
  const dispatch = useDispatch<Dispatch>();
  // booksData?.meta.pageable_count

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

  useEffect(() => {
    if (!booksData) return;
    params.set("total", booksData.meta.pageable_count.toString());
    setParams(params);
  }, [booksData]);

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
          {total === "0" && <NoResult />}
          {total !== "0" && (
            <List>
              {booksData?.documents.map(
                (
                  { title, authors, thumbnail, publisher, isbn, datetime, price, sale_price },
                  idx
                ) => {
                  return (
                    <React.Fragment key={isbn + title}>
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
