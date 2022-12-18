import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { BooksImg } from "@/components/common";

import * as S from "./styles";
//TODO: 모바일뷰에서 로고글자 대신 메인이미지 + Avatar태그
type HeaderProps = {
  children?: React.ReactNode;
  bg?: boolean;
  responsibleLogo?: boolean;
  shadow?: 0 | 1 | 2;
};

const Header = ({ children, bg, shadow, responsibleLogo = false }: HeaderProps) => {
  const { breakpoints } = useTheme();
  const underSmall = useMediaQuery(breakpoints.down("sm"));
  // maxHeight: "64px"
  return (
    <S.AppBar position="sticky" sx={{ boxShadow: shadow ?? 2 }}>
      <S.ToolBar sx={{ bgcolor: bg ? "#eeeeeea1" : null }}>
        <S.LogoArea>
          <Link to="/?filter=title">
            {!responsibleLogo && (
              <Typography variant="h6" component="h1">
                Book Finder
              </Typography>
            )}
            {responsibleLogo &&
              (underSmall ? (
                <BooksImg height="56px" width={"60px"} />
              ) : (
                <Typography variant="h6" component="h1">
                  Book Finder
                </Typography>
              ))}
          </Link>
        </S.LogoArea>
        <S.ItemBox>{children}</S.ItemBox>
      </S.ToolBar>
    </S.AppBar>
  );
};

export default Header;
