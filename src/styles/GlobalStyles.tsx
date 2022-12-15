import { css, Global } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
    `}
  />
);

export default GlobalStyles;
