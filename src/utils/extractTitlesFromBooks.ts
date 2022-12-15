import { type Book } from "@/types";
import { deduplicate } from "@/utils";

const extractTitlesFromBooks = (books: Book[], queryForExactFiltering = "") => {
  const titles = books.map((doc) => doc.title);
  const exactTitles = titles.filter((title) => title.includes(queryForExactFiltering));
  const uniqueTitles = deduplicate(exactTitles ?? []);
  return uniqueTitles;
};

export default extractTitlesFromBooks;
