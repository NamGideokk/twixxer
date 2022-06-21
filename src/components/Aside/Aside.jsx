import React from "react";
import "./Aside.scss";
import TrendArticle from "./TrendArticle";
import UserArticle from "./UserArticle";

const Aside = () => {
  function searchTwixxer(e) {
    e.preventDefault();
  }

  return (
    <aside className="aside__wrapper">
      <form onSubmit={searchTwixxer}>
        <input type="text" placeholder="전세계의 소식을 검색하세요" />
        {/* <input type="submit" value="버튼" /> */}
      </form>

      <TrendArticle />
      <UserArticle />
    </aside>
  );
};

export default Aside;
