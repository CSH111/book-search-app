import * as S from "./styles";

type VerticalSearchBoxProps = {
  children: React.ReactNode;
};
const VerticalSearchBox = ({ children }: VerticalSearchBoxProps) => {
  return <S.VerticalBox>{children}</S.VerticalBox>;
};

export default VerticalSearchBox;
