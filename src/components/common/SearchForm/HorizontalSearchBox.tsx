import * as S from "./styles";

type HorizontalSearchBoxProps = {
  children: React.ReactNode;
};

const HorizontalSearchBox = ({ children }: HorizontalSearchBoxProps) => {
  return <S.HorizontalBox>{children}</S.HorizontalBox>;
};

export default HorizontalSearchBox;
