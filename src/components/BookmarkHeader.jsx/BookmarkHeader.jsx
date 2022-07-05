import { LanguageContext } from "context/LanguageContext";
import React from "react";
import { useContext } from "react";
import "./bookmarkHeader.scss";

const BookmarkHeader = () => {
  const { isKor } = useContext(LanguageContext);

  return (
    <header className="bookmark__header">
      {isKor ? "북마크" : "Bookmarks"}
      <small>{isKor ? "Bookmarks" : "북마크"}</small>
    </header>
  );
};

export default BookmarkHeader;
