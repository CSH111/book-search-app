import { AppBar as MuiAppBar, Box as MuiBox, Toolbar as MuiToolBar } from "@mui/material";
import { css, styled } from "@mui/material/styles";

export const AppBar = styled(MuiAppBar)`
  ${({ theme: { palette } }) => css`
    background-color: ${palette.common.white};
  `}
`;

export const ToolBar = styled(MuiToolBar)`
  ${({ theme: { palette } }) => css`
    padding-left: 0px !important;
    align-items: stretch;
  `}
`;

export const LogoArea = styled(MuiBox)`
  ${({ theme: { palette } }) => css`
    background-color: ${palette.primary.main};
    align-self: stretch;
    box-shadow: #6d6d6d86 5px 4px 5px -2px;

    display: flex;
    align-items: stretch;
    a {
      padding: 0 15px;

      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: ${palette.common.white};
    }
  `}
`;

export const ItemBox = styled(MuiBox)`
  ${() => css`
    flex: 1;
  `}
`;
