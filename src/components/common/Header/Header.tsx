import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import * as S from "./styles";
type HeaderProps = {
  children?: React.ReactNode;
  bg?: boolean;
  shadow?: 0 | 1 | 2;
};
const Header = ({ children, bg, shadow }: HeaderProps) => {
  return (
    <S.AppBar position="static" sx={{ boxShadow: shadow ?? 2 }}>
      <S.ToolBar sx={{ bgcolor: bg ? "#eeeeeea1" : null }}>
        <S.LogoArea>
          <Link to="/?filter=title">
            <Typography variant="h6" component="h1">
              Book Finder
            </Typography>
          </Link>
        </S.LogoArea>
        <S.ItemBox>{children}</S.ItemBox>
      </S.ToolBar>
    </S.AppBar>
  );
};

export default Header;
