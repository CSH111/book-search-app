import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

import { SearchForm } from "../components/common";
const Home = () => {
  return (
    <Container maxWidth={"xs"}>
      {/* <h1>책 찾기 서비스</h1> */}
      <Typography component={"h1"} variant="h3" m={2}>
        책 검색 서비스
      </Typography>
      <SearchForm />
    </Container>
  );
};

export default Home;
