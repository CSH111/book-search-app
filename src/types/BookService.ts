import { AxiosResponse } from "axios";

import { FilterValue } from "./FilterValue";

export interface BookService {
  get(filterOption: FilterValue, size: number, page: number): Promise<AxiosResponse>;
}
