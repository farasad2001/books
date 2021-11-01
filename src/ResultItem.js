import React, { PureComponent } from "react";

export default class ResultItem extends PureComponent {
  render() {
    const { index, style, data } = this.props;

    console.log(index);

    return (
      <div className="result-item">
        <div className="book-cover"></div>
        <div className="book-title"></div>
        <div className="book-subtitle"></div>
        <div className="book-authors"></div>
        <div className="book-publisher"></div>
        <div className="book-publish-date"></div>
        <div className="book-categories"></div>
        <div>{index}</div>
      </div>
    );
  }
}
