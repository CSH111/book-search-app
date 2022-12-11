import { createBookService } from "./bookService";
import { createAxiosClient } from "./client";

const BASE_URL = "http://dapi.kakao.com/v3/search/book";
const API_KEY: string = process.env.REACT_APP_API_KEY ?? "";
const client = createAxiosClient(BASE_URL, API_KEY);
const bookService = createBookService(client);

export default { bookService };
