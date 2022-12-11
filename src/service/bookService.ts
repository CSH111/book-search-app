import { AxiosInstance } from "axios";
import { AxiosResponse } from "axios";

import { FilterValue } from "@/types";

// import {  } from "@types/";

// import { FilterValue } from "./FilterValue";

export interface BookService {
  get(
    keyWord: string,
    filterOption: FilterValue,
    size: number,
    page: number
  ): Promise<AxiosResponse>;
}

export const createBookService = (client: AxiosInstance): BookService => {
  return {
    get(keyWord, filterOption, size, page) {
      return client.get("", { params: { query: keyWord, target: filterOption, size, page } });
    },
  };
};
