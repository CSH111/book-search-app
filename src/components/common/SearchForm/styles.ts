import {
  Box as MuiBox,
  Paper as MuiPaper,
  Tab as MuiTab,
  Tabs as MuiTabs,
  TextField as MuiTextField,
} from "@mui/material";
import { css, styled } from "@mui/material/styles";

import { FilterValue } from "@/types";

export const Tabs = styled(MuiTabs)`
  ${({ theme: { palette }, orientation }) => css`
    background-color: ${palette.grey[200]};
    ${orientation === "vertical" &&
    css`
      align-self: stretch;
      box-shadow: #6d6d6d86 2px 4px 5px -3px;
      button {
        width: 30px;
        padding: 0;
      }
      .MuiTabs-flexContainer {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 1fr;
      }
      .MuiTabs-indicator {
        width: 100%;
      }
      .MuiSvgIcon-root {
        font-size: 20px;
      }
    `}
    ${orientation === "horizontal" &&
    css`
      height: 25px;
      min-height: 0px;
      display: inline-flex;
      border-radius: 9999px;
      .MuiTabs-indicator {
        height: 100%;
      }
      > div {
        height: inherit;
      }
      > div > div {
        height: inherit;
      }
      button {
        justify-content: flex-end;
      }
    `}
  `}
`;

export interface TabProps {
  value: FilterValue;
  // value: "title" | "person";
}

export const Tab = styled(MuiTab)<TabProps>`
  ${({ theme: { palette } }) => css`
    transition: all 0.3s;
    z-index: 1;
    padding: 5px;
    font-size: 11px;
    width: 50px;
    min-width: 0px;
    min-height: 0px;
    &.Mui-selected {
      color: ${palette.common.white};
    }
  `}
`;

type TextFieldProp = {
  isPopupOpened?: boolean;
};
export const TextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "isPopupOpened",
})<TextFieldProp>`
  ${({ theme: { palette }, isPopupOpened }) => css`
    font-size: 12px !important;
    border: none;
    border-radius: ${isPopupOpened ? "15px 15px 0 0" : " 9999px"};
    background-color: ${palette.common.white};
    display: flex;
    justify-content: center;
    height: 45px;
    fieldset {
      border: none;
      border-radius: 0;
      border-bottom: ${isPopupOpened ? `solid 1px ${palette.grey[300]} !important` : "none"};
    }
    .MuiInputBase-root {
      height: 45px;
      font-size: 14px;
      padding-left: 15px !important;
      input {
        padding-left: 0px !important;
      }
    }
  `}
`;
css`justify-content`;

export const Paper = styled(MuiPaper)`
  ${() => css`
    border-radius: 0 0 15px 15px;
    li {
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  `}
`;

export const HorizontalBox = styled(MuiBox)`
  ${() => css`
    height: 100%;
    display: flex;
    align-items: stretch;
    flex: 1;
    form {
      flex: 1;
      max-width: 600px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .MuiTabs-root {
    }
  `}
`;
export const VerticalBox = styled(MuiBox)`
  ${() => css`
    form {
      margin-top: 5px;
    }
  `}
`;
