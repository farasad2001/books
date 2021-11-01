import React from "react";

const Book = ({ accessInfo, volumeInfo }) => {
  const authors = volumeInfo.authors?.join(" ");

  const imageSource = volumeInfo.imageLinks?.thumbnail?.replace(
    "http",
    "https"
  );
  const categories = volumeInfo.categories?.join(" / ");
  return (
    <li className="result-item">
      <div
        className="book-cover"
        title="Book Cover"
        style={{
          backgroundImage: "url(" + imageSource + ")"
        }}
      ></div>
      <h1 className="book-title" aria-label="Book title">
        {volumeInfo.title}
      </h1>
      {volumeInfo.subtitle !== undefined && (
        <h2 className="book-subtitle">{volumeInfo.subtitle}</h2>
      )}
      <p className="book-authors" title="Authors">
        {authors}
      </p>
      <div className="book-details">
        <p className="label">Publisher:</p>
        <p>{volumeInfo.publisher}</p>
        <p className="label">Published:</p>
        <p>{volumeInfo.publishedDate}</p>
        <p className="label">Print Type:</p>
        <p>{volumeInfo.printType}</p>
        <p className="label">Categories:</p>
        <p className="categories" title={categories}>
          {categories}
        </p>
      </div>
      <div className="book-buttons">
        <a href={volumeInfo.previewLink} target="_blank" rel="noreferrer">
          Preview
        </a>
        <button>Add To Libraray</button>
        <a href={accessInfo.webReaderLink} target="_blank" rel="noreferrer">
          Read More
        </a>
      </div>
    </li>
  );
};

export default Book;
