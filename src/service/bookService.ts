import { AxiosInstance } from "axios";

import { BookService } from "@/types";

export const createBookService = (client: AxiosInstance): BookService => {
  return {
    get(filterOption, size, page) {
      return client.get("", { params: { target: filterOption, size, page } });
    },
  };
};
