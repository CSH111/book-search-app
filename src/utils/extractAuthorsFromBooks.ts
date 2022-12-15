import { type Book } from "@/types";
import { deduplicate } from "@/utils";

const extractAuthorsFromBooks = (books: Book[], queryForExactFiltering = "") => {
  console.log(books.map((book) => book.authors));
  const authors = books.map(({ authors: _authors }) => {
    const exactAuthors = _authors.filter((author) => {
      return author.length > 1 && author.includes(queryForExactFiltering);
    });
    return exactAuthors;
  });
  const flatedArr = authors.flat();
  return deduplicate(flatedArr ?? []);
};

export default extractAuthorsFromBooks;
