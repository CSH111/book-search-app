import { type Book } from "@/types";
import { deduplicate } from "@/utils";

const extractTitlesFromBooks = (books: Book[], queryForExactFiltering = "") => {
  const titles = books.map((doc) => doc.title);
  console.log(titles);
  const exactTitles = titles.filter((title) => title.includes(queryForExactFiltering));
  console.log(exactTitles);
  const uniqueTitles = deduplicate(exactTitles ?? []);
  console.log(books);
  return uniqueTitles;
};

export default extractTitlesFromBooks;
