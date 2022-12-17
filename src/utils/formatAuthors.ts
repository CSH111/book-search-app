const isInValidAuthorDataType = (authors: string[]) => {
  return authors.length > 2 && authors.every((author) => author.length === 1);
};

const formatAuthors = (authors: string[]) => {
  if (isInValidAuthorDataType(authors)) {
    return authors.join("");
  }
  const [firstAuthor] = authors;
  return authors.length === 1 ? firstAuthor : `${firstAuthor} 외 ${authors.length - 1} 명`;
};

export default formatAuthors;
