import React from "react";
import Book from "./Book";

const BooksList = ({ books }) => {
  return (
    <ul className="result">
      {books && books.map((book) => <Book key={book.id} {...book} />)}
    </ul>
  );
};

export default BooksList;
