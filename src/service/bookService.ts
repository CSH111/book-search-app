import { AxiosInstance } from "axios";
import { AxiosResponse } from "axios";

import { PARAMS_KEYS } from "@/constants";
import { FilterValue } from "@/types";

export interface BookService {
  get(query: string, target: FilterValue, size: number, page: number): Promise<AxiosResponse>;
}

export const createBookService = (client: AxiosInstance): BookService => {
  return {
    get(query, target, size, page) {
      return client.get("", {
        params: {
          [PARAMS_KEYS.query]: query,
          [PARAMS_KEYS.target]: target,
          [PARAMS_KEYS.size]: size,
          [PARAMS_KEYS.page]: page,
        },
      });
    },
  };
};
