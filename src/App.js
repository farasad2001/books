import React, { useState, useEffect } from "react";
import BooksList from "./components/BooksList";

const App = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 12;
  const query = "UX";

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);

        const startIndex = page * pageSize;

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${pageSize}`
        );

        const data = await response.json();
        const items = data.items;

        setBooks((books) => [...books, ...items]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [page]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <main className="main-section">
      <BooksList books={books} />
      <div className="load-more">
        <button onClick={loadMore} className="load-btn">
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </main>
  );
};

export default App;
