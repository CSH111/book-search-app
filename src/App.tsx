import { CssBaseline } from "@mui/material";

import AppRouter from "./AppRouter";
import { createAxiosClient, createBookService, ServiceProvider } from "./service";

const BASE_URL = "http://dapi.kakao.com/v3/search/book";
const API_KEY = process.env.REACT_APP_API_KEY;
const client = createAxiosClient(BASE_URL, API_KEY ?? "");
const bookService = createBookService(client);
console.log(API_KEY);
function App() {
  return (
    <>
      <ServiceProvider services={{ bookService }}>
        <CssBaseline />
        <AppRouter />
      </ServiceProvider>
    </>
  );
}

export default App;
