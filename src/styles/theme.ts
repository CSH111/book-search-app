import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module "@mui/material/styles" {
  interface ThemeOverrides {
    breakpoints: {
      values: {
        xxs: number;
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }
  // allow configuration using `createTheme`
  // interface ThemeOptions {
  //   status?: {
  //     danger?: string;
  //   };
  // }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
export default theme;
