import { Container } from "@mui/material";

import { Header } from "@/components/common/Header";
import { SearchFilter, VerticalSearchBox } from "@/components/common/SearchForm";
import { BooksImg, MainImgContainer } from "@/components/Home";

import { SearchForm } from "../components/common";
const Home = () => {
  return (
    <>
      <Header shadow={0} />
      <Container maxWidth={"sm"} sx={{ flex: 1 }}>
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
