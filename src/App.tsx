import { CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";

import AppRouter from "./AppRouter";
// import { createAxiosClient, createBookService, ServiceProvider } from "./service";
import store from "./store";

// const BASE_URL = "http://dapi.kakao.com/v3/search/book";
// const API_KEY: string = process.env.REACT_APP_API_KEY ?? "";
// const client = createAxiosClient(BASE_URL, API_KEY);
// const bookService = createBookService(client);

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <CssBaseline />
        <AppRouter />
      </ReduxProvider>
    </>
  );
}

export default App;
