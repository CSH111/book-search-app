import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";

import AppRouter from "./AppRouter";
import store from "./store";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default App;

//TODO: query 상수가 필요한가? 자동완성으로 커버해보기
