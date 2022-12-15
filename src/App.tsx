import { CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";

import AppRouter from "./AppRouter";
import store from "./store";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <GlobalStyles />
        <CssBaseline />
        <AppRouter />
      </ReduxProvider>
    </>
  );
}

export default App;
