import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { Header } from "@/components/common/Header";
import { SearchFilter, VerticalSearchBox } from "@/components/common/SearchForm";
import { BooksImg, MainImgContainer } from "@/components/Home";

import { SearchForm } from "../components/common";
const Home = () => {
  return (
    <>
      <Header shadow={0} />
      <Container maxWidth={"sm"}>
        <MainImgContainer>
          <BooksImg width="80%" height="100%" />
        </MainImgContainer>
        <VerticalSearchBox>
          <SearchFilter orientation="horizontal" sx={{ boxShadow: 2 }} />
          <SearchForm />
        </VerticalSearchBox>
      </Container>
    </>
  );
};

export default Home;
