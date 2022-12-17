import { Container } from "@mui/material";

import { BooksImg, Header } from "@/components/common";
import { SearchFilter, SearchForm, VerticalSearchBox } from "@/components/common/SearchForm";
import { MainImgContainer } from "@/components/Home";

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
