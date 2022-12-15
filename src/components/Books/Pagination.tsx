import { Pagination as MuiPaginaion } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  count: number;
};

const Pagination = () => {
  const [params, setParams] = useSearchParams();
  const { target, filter, title, query, total, page, size } = Object.fromEntries(params.entries());
  const totalPage = Math.ceil(Number(total) / Number(size));
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    params.set("page", page.toString());
    setParams(params);
  };

  return (
    <MuiPaginaion
      count={totalPage}
      page={Number(page)}
      onChange={handleChange}
      color="primary"
      sx={{ mb: "30px" }}
    />
  );
};

export default Pagination;
