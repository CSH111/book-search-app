import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Books, Home } from "./pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
