import { Box, Grid, ListItem, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { formatAuthors, formatISO, formatKrCurreny } from "@/utils";

type BookItemProps = {
  title: string;
  authors: string[];
  thumbnail: string;
  publisher: string;

  datetime: string;
  price: string;
  sale_price: string;
};

const BookItem = ({
  title,
  authors,
  thumbnail,
  publisher,
  datetime,
  price,
  sale_price,
}: BookItemProps) => {
  const { breakpoints } = useTheme();
  const underMid = useMediaQuery(breakpoints.down("md"));

  return (
    <ListItem>
      {underMid && (
        <Grid container spacing={1}>
          <Grid item>
            <Typography component="h2" sx={{ fontSize: "18px" }}>
              {title}
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs="auto" xxs={12} display="flex" justifyContent="center">
              <ImgBox>
                {thumbnail ? (
                  <img src={thumbnail} alt="bookImg" />
                ) : (
                  <span>표지 이미지가 없습니다.</span>
                )}
              </ImgBox>
            </Grid>
            <Grid item container direction="column" xs>
              <Grid item container direction="column">
                <Grid item>
                  <BookTypography label="저자" contents={formatAuthors(authors)} />
                </Grid>
                <Grid item>
                  <BookTypography label="출판사" contents={publisher} />
                </Grid>
                <Grid item>
                  <BookTypography label="출간연월" contents={formatISO(datetime)} />
                </Grid>
              </Grid>
              <Grid item container direction="column">
                <Grid item>
                  <BookTypography label="정가" contents={formatKrCurreny(price)} />
                </Grid>
                <Grid item>
                  <BookTypography label="할인가" contents={formatKrCurreny(sale_price)} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {!underMid && (
        <Grid container spacing={2}>
          <Grid item>
            <ImgBox>
              {thumbnail ? (
                <img src={thumbnail} alt="bookImg" />
              ) : (
                <span>표지 이미지가 없습니다.</span>
              )}
            </ImgBox>
          </Grid>
          <Grid item container direction="column" md={6} lg={8}>
            <Grid item>
              <Typography component="h2" sx={{ fontSize: "18px" }}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <BookTypography label="저자" contents={formatAuthors(authors)} />
            </Grid>
            <Grid item>
              <BookTypography label="출판" contents={publisher} />
            </Grid>
            <Grid item>
              <BookTypography label="출간월" contents={formatISO(datetime)} />
            </Grid>
          </Grid>
          <Grid item container direction="column" md>
            <Grid item>
              <BookTypography label="정가" contents={formatKrCurreny(price)} />
            </Grid>
            <Grid item>
              <BookTypography label="할인가" contents={formatKrCurreny(sale_price)} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </ListItem>
  );
};

export default BookItem;

const BookTypography = ({ label = "", contents = "" }) => {
  return (
    <>
      <Typography component="span" variant="caption" mr={0.5} alignItems="center" color={"grey"}>
        {label}
      </Typography>

      <Typography component="span" variant="body2">
        {contents}
      </Typography>
    </>
  );
};

type ImgBoxType = {
  children: React.ReactNode;
};
const ImgBox = ({ children }: ImgBoxType) => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      sx={{
        width: "120px",
        minWidth: "120px",
        height: "174px",
        minHeight: "174px",
        outline: "solid 1px grey",
      }}
    >
      {children}
    </Box>
  );
};
