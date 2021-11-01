import React, { createRef, Fragment, PureComponent } from "react";
import { FixedSizeList} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];

class Row extends PureComponent {
  render() {
    const { index, style } = this.props;
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = `Row ${index}`;
    } else {
      label = "Loading...";
    }
    return (
      <div className="ListItem" style={style}>
        {label}
      </div>
    );
  }
}

export default function App() {
  const resultMap = {};
  let totalItems = 1000;

  const loadMoreItems = async (startIndex, stopIndex) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }

    const maxResults = stopIndex - startIndex + 1;

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=flowers&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    const result = await response.json();

    const items = result.items;
    totalItems = result.totalItems;
    // console.log(result);

    console.log(startIndex, stopIndex);

    for (let index = startIndex; index <= stopIndex; index++) {
      resultMap[index] = items[index - startIndex];
    }

    console.log(resultMap);
  };

  class ResultItem extends PureComponent {
    render() {
      const { index } = this.props;
      const item = resultMap[index];
      if (item) {
        const { volumeInfo } = item;
        const authors = volumeInfo.authors?.join(" ");

        const imageSource = volumeInfo.imageLinks.thumbnail?.replace('http','https');
        const categories = volumeInfo.categories?.join(" / ");

        return (
          <div className="result-item">
            <div
              className="book-cover"
              title="Book Cover"
              style={{
                backgroundImage: "url(" + imageSource + ")"
              }}
            ></div>
            <h1 className="book-title">{volumeInfo.title}</h1>
            <h2 className="book-subtitle">{volumeInfo.subtitle}</h2>
            <p className="book-authors">{authors}</p>
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
              <a
                href={item.accessInfo.webReaderLink}
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }

  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={totalItems}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className="result"
            height={700}
            itemCount={totalItems}
            itemSize={400}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {ResultItem}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </Fragment>
  );
}
