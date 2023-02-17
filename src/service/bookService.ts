import { AxiosInstance } from "axios";
import { AxiosResponse } from "axios";

import { FilterValue } from "@/types";

export interface BookService {
  get(query: string, target: FilterValue, size: number, page: number): Promise<AxiosResponse>;
}

export const createBookService = (client: AxiosInstance): BookService => {
  return {
    get(query, target, size, page) {
      return client.get("", { params: { query, target, size, page } });
    },
  };
};
