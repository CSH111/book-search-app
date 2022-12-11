import { AxiosResponse } from "axios";

import { FilterValue } from "./FilterValue";

export interface BookService {
  get(
    keyWord: string,
    filterOption: FilterValue,
    size: number,
    page: number
  ): Promise<AxiosResponse>;
}
