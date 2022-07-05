import { LanguageContext } from "context/LanguageContext";
import React from "react";
import { useContext } from "react";
import "./aside.scss";
import TrendArticle from "./TrendArticle";
import UserArticle from "./UserArticle";

const Aside = () => {
  const { isKor } = useContext(LanguageContext);

  function searchTwixxer(e) {
    e.preventDefault();
  }

  return (
    <aside className="aside__wrapper">
      <form onSubmit={searchTwixxer}>
        <input
          type="text"
          placeholder={isKor ? "전세계의 소식을 검색하세요" : "Search twixxer"}
        />
        {/* <input type="submit" value="버튼" /> */}
      </form>

      <TrendArticle />
      <UserArticle />
    </aside>
  );
};

export default Aside;
