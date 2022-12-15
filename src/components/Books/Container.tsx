import MuiContainer from "@mui/material/Container";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <MuiContainer
      maxWidth="md"
      fixed
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
