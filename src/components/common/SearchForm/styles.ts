// import styled from "@emotion/styled";
import { Tab as OriginTab, Tabs as OriginTabs } from "@mui/material";
import { css, styled } from "@mui/material/styles";

export const Tabs = styled(OriginTabs)`
  ${({ theme: { palette } }) => css`
    background-color: ${palette.grey[200]};
    height: 30px;
    margin-bottom: 5px;
    min-height: 0px;
    display: inline-flex;
    border-radius: 999px;
    .MuiTabs-indicator {
      height: 200px;
    }
    > div {
      height: inherit;
    }
    > div > div {
      height: inherit;
    }
  `}
`;
export const Tab = styled(OriginTab)`
  ${({ theme: { palette } }) => css`
    transition: all 0.3s;
    z-index: 1;
    padding: 5px;
    font-size: 12px;
    width: 60px;
    min-width: 0px;
    min-height: 0px;
    &.Mui-selected {
      color: ${palette.common.white};
    }
  `}
`;
