import { Pagination as MuiPaginaion } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  count: number;
};

const Pagination = () => {
  const [params, setParams] = useSearchParams();
  const currentPage = Number(params.get("page"));

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    params.set("page", page.toString());
    setParams(params);
  };

  return (
    <MuiPaginaion
      count={10}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      sx={{ mb: "30px" }}
    />
  );
};

export default Pagination;
