import { Pagination as MuiPaginaion } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [params, setParams] = useSearchParams();
  const { total, page, size } = Object.fromEntries(params.entries());
  const totalPage = total ? Math.ceil(Number(total) / Number(size)) : 0;
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    params.set("page", page.toString());
    setParams(params);
    window.scrollTo({ top: 0 });
  };

  return (
    <MuiPaginaion
      count={totalPage}
      page={Number(page) > totalPage ? totalPage : Number(page)}
      onChange={handleChange}
      color="primary"
      sx={{ mb: "30px" }}
    />
  );
};

export default Pagination;
